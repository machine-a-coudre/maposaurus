export async function getCapabilities(url: string, serviceType: string) {
  const ns = {
    ows: 'http://www.opengis.net/ows/1.1',
    wfs: 'http://www.opengis.net/wfs/2.0',
  }

  try {
    const response = await fetch(
      `${url}?service=${serviceType}&version=2.0.0&request=GetCapabilities`,
    )

    if (!response.ok) {
      throw new Error(`${response.status}`)
    }

    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')

    const serviceIdentification = xmlDoc.getElementsByTagNameNS(
      ns.ows,
      'ServiceIdentification',
    )[0]
    const title = serviceIdentification?.getElementsByTagNameNS(
      ns.ows,
      'Title',
    )[0]?.textContent
    const abstract = serviceIdentification?.getElementsByTagNameNS(
      ns.ows,
      'Abstract',
    )[0]?.textContent

    const featureTypes = xmlDoc.getElementsByTagName('FeatureType')
    const layers = []

    for (let i = 0; i < featureTypes.length; i++) {
      const nameElement = featureTypes[i].getElementsByTagName('Name')[0]
      const titleElement = featureTypes[i].getElementsByTagName('Title')[0]
      const abstractElement =
        featureTypes[i].getElementsByTagName('Abstract')[0]

      if (nameElement && nameElement.textContent) {
        layers.push({
          name: nameElement.textContent,
          title: titleElement?.textContent || nameElement.textContent,
          abstract: abstractElement?.textContent,
        })
      }
    }

    layers.sort((a, b) => a.title.localeCompare(b.title))

    return {
      title,
      abstract,
      layers,
    }
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
