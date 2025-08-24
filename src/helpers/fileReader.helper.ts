import { gpx, kml } from '@mapbox/togeojson'

export function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => resolve(<string>e.target?.result)
    reader.onerror = (e) => reject(new Error('Unable to read file'))

    reader.readAsText(file)
  })
}

function convertGpxToGeoJson(txt: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(txt, 'text/xml')
  return gpx(doc, { styles: true })
}

function convertKmlToGeoJson(txt: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(txt, 'text/xml')
  return kml(doc, { styles: true })
}

export async function getFileContentAsGeoJson(file: File) {
  const content = await readFileContent(file)

  if (file.type.includes('gpx')) {
    return convertGpxToGeoJson(content)
  }

  if (file.type.includes('kml')) {
    return convertKmlToGeoJson(content)
  }

  return JSON.parse(content)
}
