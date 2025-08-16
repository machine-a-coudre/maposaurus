import { gpx } from '@mapbox/togeojson'

export function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => resolve(<string>e.target?.result)
    reader.onerror = (e) => reject(new Error('Unable to read file'))

    reader.readAsText(file)
  })
}

function convertGpxToGeoJson(gpxString: string) {
  const parser = new DOMParser()
  const gpxDoc = parser.parseFromString(gpxString, 'text/xml')
  return gpx(gpxDoc)
}

export async function getFileContentAsGeoJson(file: File) {
  const content = await readFileContent(file)

  if (file.type.includes('gpx')) {
    return convertGpxToGeoJson(content)
  }

  return JSON.parse(content)
}
