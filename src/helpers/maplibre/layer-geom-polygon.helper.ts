import type { AddLayerObject } from 'maplibre-gl'
import type { MTLayerDefinition } from '@/stores/app'

export function createLayerPolygon(layer: MTLayerDefinition): AddLayerObject {
  return {
    id: `${layer.name}-fill`,
    type: 'fill',
    source: layer.name,
    paint: {
      'fill-color': layer.color,
      'fill-opacity': 0.5,
    },
    filter: ['==', '$type', 'Polygon'],
    minzoom: 0,
    maxzoom: 24,
  }
}
