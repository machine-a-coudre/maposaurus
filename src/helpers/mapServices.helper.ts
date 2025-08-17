import { WfsEndpoint, WmsEndpoint, WmtsEndpoint } from '@camptocamp/ogc-client'

export type MTServiceProtocol = 'WFS' | 'WMS' | 'WMTS'
export type MTServiceVersion = '1.0.0' | '1.1.0' | '1.1.1' | '1.3.0' | '2.2.0'
export type MTServiceCapabilities = {
  title: string
  abstract: string
  layers?: Record<string, any>
}

export async function getCapabilities(
  url: string,
  serviceProtocol: MTServiceProtocol,
  serviceVersion: MTServiceVersion,
): Promise<MTServiceCapabilities | undefined> {
  const urlEndpoint = `${url}?version=${serviceVersion}`
  let endpoint: WfsEndpoint | WmsEndpoint | WmtsEndpoint | null = null

  switch (serviceProtocol) {
    case 'WFS':
      endpoint = await new WfsEndpoint(urlEndpoint).isReady()
      break
    case 'WMS':
      endpoint = await new WmsEndpoint(urlEndpoint).isReady()
      break
    case 'WMTS':
      endpoint = await new WmtsEndpoint(urlEndpoint).isReady()
      break
    default:
      break
  }

  if (endpoint) {
    const title = endpoint.getServiceInfo().title
    const abstract = endpoint.getServiceInfo().abstract
    const layers =
      endpoint instanceof WfsEndpoint
        ? (<WfsEndpoint>endpoint).getFeatureTypes()
        : (endpoint instanceof WmsEndpoint
            ? endpoint.getFlattenedLayers()
            : endpoint.getLayers()
          ).map((l) => endpoint.getLayerByName(l.name))

    layers.sort((a, b) => a.title.localeCompare(b.title))

    return {
      title,
      abstract,
      layers,
    }
  } else {
    return undefined
  }
}
