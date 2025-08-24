import { type Map } from 'maplibre-gl'
import { type MTLayerDefinition } from '@/stores/app'

export async function addGeojsonLayerToMap(
  map: Map,
  layer: MTLayerDefinition,
  data: GeoJSON.GeoJSON,
) {
  map.addSource(layer.name, {
    cluster: false,
    type: 'geojson',
    data,
  })

  const styles = <Record<string, any>>{
    LineString: {},
    Point: {},
    Polygon: {},
  }

  data.features.forEach((f) => {
    if (styles[f.geometry.type][f.properties.styleUrl]) return
    styles[f.geometry.type][f.properties.styleUrl] = f.properties
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
    minzoom: 0,
    maxzoom: 24,
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
    minzoom: 0,
    maxzoom: 24,
  })

  for (const s of Object.values(styles['Point'])) {
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
      minzoom: 0,
      maxzoom: 24,
    })

    if (s.icon) {
      const image = await map.loadImage(s.icon)
      map.addImage(`${layer.name}-points-${s.styleUrl}`, image.data)
      map.addLayer({
        id: `${layer.name}-points-${s.styleUrl}`,
        type: 'symbol',
        source: layer.name,
        layout: {
          'icon-image': `${layer.name}-points-${s.styleUrl}`,
          'icon-size': 1,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'text-allow-overlap': true,
          'text-ignore-placement': true,
        },
        filter: [
          'all',
          ['==', '$type', 'Point'],
          ['==', 'styleUrl', s.styleUrl],
        ],
        minzoom: 0,
        maxzoom: 24,
      })
    } else {
      map.addLayer({
        id: `${layer.name}-circle-${s.styleUrl}`,
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
      })
    }
  }
}
