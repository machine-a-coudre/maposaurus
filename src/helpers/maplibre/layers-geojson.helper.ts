import { type Map } from 'maplibre-gl'
import { type MTLayerDefinition } from '@/stores/app'

export async function addGeojsonLayerToMap(
  map: Map,
  layer: MTLayerDefinition,
  data: GeoJSON.GeoJSON,
) {
  map.addSource(layer.name, {
    type: 'geojson',
    data,
  })

  map.addLayer({
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
  })

  map.addLayer({
    id: `${layer.name}-line`,
    type: 'line',
    source: layer.name,
    paint: {
      'line-color': layer.color,
      'line-width': 3,
    },
    filter: ['==', '$type', 'LineString'],
  })

  map.addLayer({
    id: `${layer.name}-fill`,
    type: 'fill',
    source: layer.name,
    paint: {
      'fill-color': layer.color,
      'fill-opacity': 0.5,
    },
    filter: ['==', '$type', 'Polygon'],
  })
}
