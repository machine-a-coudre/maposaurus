export function useLayerconnector() {
  async function getBaignadeData() {
    const response = await fetch(
      'https://www.data.gouv.fr/api/1/datasets/r/a6f8d961-d4c6-4fc0-9af1-d530861928ef',
    )

    const csvText = await response.text()

    const features = []
    const lines = csvText.split('\n').filter((line) => line.trim() !== '')
    const headers = lines[0].split(';').map((h) => h.trim())

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(';')
      const properties = {}

      headers.forEach((header, index) => {
        properties[header] = values[index]?.trim()
      })

      // Conversion des coordonnées (attention au format français avec virgule)
      const longitude = parseFloat(
        properties['Longitude (ETRS 89)'].replace(',', '.'),
      )
      const latitude = parseFloat(
        properties['Latitude (ETRS 89)'].replace(',', '.'),
      )

      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        properties,
      })
    }

    return {
      type: 'FeatureCollection',
      features,
    }
  }

  return {
    getBaignadeData,
  }
}
