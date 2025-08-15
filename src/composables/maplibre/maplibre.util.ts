import type { Map } from 'maplibre-gl'
import type { MTLayerDefinition } from '@/stores/app'

export function mutateLayerMaplibre(map: Map, layer: MTLayerDefinition) {
  map.setLayoutProperty(
    layer.name,
    'visibility',
    layer.visibility ? 'visible' : 'none',
  )
}

export function addLayerMaplibre(map: Map, layer: MTLayerDefinition) {
  if (layer.type === 'WFS') {
    addWFSLayer(map, layer)
  } else if (layer.type === 'WMS') {
    addWMSLayer(map, layer)
  } else {
    throw new Error('[Error] Maplibre.util:: Unknown layer type.')
  }
}

async function addWFSLayer(map: Map, layer: MTLayerDefinition) {
  const req = await fetch(layer.url)

  if (!req.ok) {
    throw new Error(`[Error] Maplibre.util:: ${req.status} ${req.statusText}`)
  }

  const data = await req.json()

  map.addSource(layer.name, {
    type: 'geojson',
    data,
  })

  map.addLayer({
    id: `${layer.name}`,
    type: 'circle',
    source: layer.name,
    paint: {
      'circle-radius': 6,
      'circle-color': '#ffc83c',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#0f172b',
    },
  })
}

async function addWMSLayer(map: Map, layer: MTLayerDefinition) {
  map.addSource(layer.name, {
    type: 'raster',
    tiles: [
      'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015',
    ],
    tileSize: 256,
  })

  map.addLayer({
    id: `${layer.name}`,
    type: 'raster',
    source: layer.name,
    paint: {},
  })
}
