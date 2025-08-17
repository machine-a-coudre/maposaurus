import { type Map } from 'maplibre-gl'
import { type MTLayerDefinition } from '@/stores/app'

export async function addWMXSLayerToMap(map: Map, layer: MTLayerDefinition) {
  const tilesUrl = getUrlTiles(layer)

  map.addSource(layer.name, {
    type: 'raster',
    tiles: [tilesUrl],
    tileSize: 256,
  })

  map.addLayer({
    id: `${layer.name}`,
    type: 'raster',
    source: layer.name,
    paint: {},
  })
}

function getUrlTiles(layer: MTLayerDefinition) {
  const format = `format=image/png`
  const transparent = `transparent=true`
  const width = `width=256`
  const height = `height=256`
  const crs = `${layer.serviceVersion === '1.3.0' || layer.serviceVersion === '2.2.0' ? 'crs' : 'srs'}=EPSG:3857` // NB. srs for older versions than 1.3.0

  return `${layer.serviceUrl}?request=GetMap&service=${layer.type}&version=${layer.serviceVersion}&layers=${layer.name}&${crs}&${format}&${transparent}&${width}&${height}&bbox={bbox-epsg-3857}&styles=`
}
