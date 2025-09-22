import type { AddLayerObject } from 'maplibre-gl'
import type { MTLayerDefinition } from '@/stores/app'

export function createLayerPoint(layer: MTLayerDefinition): AddLayerObject {
  return {
    id: `${layer.name}-circle`,
    type: 'circle',
    source: layer.name,
    paint: {
      'circle-radius': 6,
      'circle-color': layer.color,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#0f172b',
    },
    filter: ['==', '$type', 'Point'],
    minzoom: 0,
    maxzoom: 24,
  }
}

export function createLayerPointIcon(
  layer: MTLayerDefinition,
  url: string,
): AddLayerObject {
  return {
    id: `${layer.name}-point-icon-${url}`,
    type: 'symbol',
    source: layer.name,
    layout: {
      'icon-image': `${layer.name}-point-icon-${url}`,
      'icon-size': 1,
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
      'text-allow-overlap': true,
      'text-ignore-placement': true,
    },
    filter: ['all', ['==', '$type', 'Point'], ['==', 'styleUrl', url]],
    minzoom: 0,
    maxzoom: 24,
  }
}
