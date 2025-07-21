export function useLayerconnector() {

  /**
   * WIP!!!! layer WFS test TODO: clean
   * @returns 
   */
  async function getBaignadeData() {
    const [sitesResponse, alertsResponse] = await Promise.all([
      fetch(
        'https://www.data.gouv.fr/api/1/datasets/r/a6f8d961-d4c6-4fc0-9af1-d530861928ef',
      ),
      fetch(
        'https://www.data.gouv.fr/api/1/datasets/r/c9d350c8-96b0-478d-a894-941365bc0253',
      ),
    ])

    const sitesCsv = await sitesResponse.text()
    const alertsCsv = await alertsResponse.text()

    // Convertir en GeoJSON avec statut combiné
    const features = []
    const sites = parseCsv(sitesCsv)
    const alerts = parseCsv(alertsCsv)

    // Combiner les données
    sites.forEach((site) => {
      const siteAlerts = alerts.filter(
        (a) =>
          a["Code unique d'identification du site de baignade"] ===
          site["Code unique d'identification du site de baignade"],
      )

      const isBanned = siteAlerts.some(
        (a) => a["Type d'�v�nement"] !== 'Saison baln�aire',
      )
      const currentStatus = isBanned ? 'banned' : 'open'

      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(site['Longitude (ETRS 89)'].replace(',', '.')),
            parseFloat(site['Latitude (ETRS 89)'].replace(',', '.')),
          ],
        },
        properties: {
          ...site,
          status: currentStatus,
          alerts: siteAlerts,
        },
      })
    })

    return {
      type: 'FeatureCollection',
      features,
    }
  }

  function parseCsv(csvText) {
    const lines = csvText.split('\n').filter((line) => line.trim() !== '')
    const headers = lines[0].split(';').map((h) => h.trim())

    return lines.slice(1).map((line) => {
      const values = line.split(';')
      return headers.reduce((obj, header, i) => {
        obj[header] = values[i]?.trim()
        return obj
      }, {})
    })
  }

  return {
    getBaignadeData,
  }
}
