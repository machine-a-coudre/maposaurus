import type { Map } from 'maplibre-gl'
import type { MTLayerDefinition } from '@/stores/app'

export function mutateLayerMaplibre(map: Map, layer: MTLayerDefinition) {
  map.setLayoutProperty(
    layer.name,
    'visibility',
    layer.visibility ? 'visible' : 'none',
  )
}

export function addLayerMaplibre(
  map: Map,
  layer: MTLayerDefinition,
  data: Record<string, any>,
) {
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
