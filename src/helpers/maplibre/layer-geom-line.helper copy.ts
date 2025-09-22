import type { AddLayerObject } from 'maplibre-gl'
import type { MTLayerDefinition } from '@/stores/app'

export function createLayerLine(layer: MTLayerDefinition): AddLayerObject {
  return {
    id: `${layer.name}-line`,
    type: 'line',
    source: layer.name,
    paint: {
      'line-color': layer.color,
      'line-width': 3,
    },
    filter: ['==', '$type', 'LineString'],
    minzoom: 0,
    maxzoom: 24,
  }
}
