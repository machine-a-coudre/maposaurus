import type { Map } from 'maplibre-gl'
import type { MTLayerDefinition } from '@/stores/app'

export function removeLayerMapLibre(map: Map, layer: MTLayerDefinition) {
  ;['', '-circle', '-line', '-fill'].forEach(
    (postfix) =>
      map.getLayer(`${layer.name}${postfix}`) &&
      map.removeLayer(`${layer.name}${postfix}`),
  )

  map.getSource(layer.name) && map.removeSource(layer.name)
}

export function mutateLayerMaplibre(map: Map, layer: MTLayerDefinition) {
  ;['', '-circle', '-line', '-fill'].forEach(
    (postfix) =>
      map.getLayer(`${layer.name}${postfix}`) &&
      map.setLayoutProperty(
        `${layer.name}${postfix}`,
        'visibility',
        layer.visibility ? 'visible' : 'none',
      ),
  )
}

export function addLayerMaplibre(map: Map, layer: MTLayerDefinition) {
  if (layer.type === 'geojson') {
    addGeojsonLayer(map, layer, layer.data)
  } else if (layer.type === 'WFS') {
    addWFSLayer(map, layer)
  } else if (layer.type === 'WMS' || layer.type === 'WMTS') {
    addWMXSLayer(map, layer)
  } else {
    throw new Error('[Error] Maplibre.util:: Unknown layer type.')
  }
}

async function addGeojsonLayer(
  map: Map,
  layer: MTLayerDefinition,
  data: unknown,
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
      'circle-color': '#ffc83c',
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
      'line-color': '#3F51B5',
      'line-width': 3,
    },
    filter: ['==', '$type', 'LineString'],
  })

  map.addLayer({
    id: `${layer.name}-fill`,
    type: 'fill',
    source: layer.name,
    paint: {
      'fill-color': '#ffc83c',
      'fill-opacity': 0.5,
    },
    filter: ['==', '$type', 'Polygon'],
  })
}

async function addWFSLayer(map: Map, layer: MTLayerDefinition) {
  const url = getUrlWfs(layer)
  const req = await fetch(url)

  if (!req.ok) {
    throw new Error(`[Error] Maplibre.util:: ${req.status} ${req.statusText}`)
  }

  const data = await req.json()

  addGeojsonLayer(map, layer, data)
}

async function addWMXSLayer(map: Map, layer: MTLayerDefinition) {
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

function getUrlWfs(layer: MTLayerDefinition) {
  return `${layer.serviceUrl}?service=WFS&request=GetFeature&version=2.0.0&srsName=EPSG%3A4326&typeNames=${encodeURIComponent(layer.name)}&outputFormat=${encodeURIComponent('application/json; subtype=geojson; charset=utf-8')}`
}

function getUrlTiles(layer: MTLayerDefinition) {
  const format = `format=image/png`
  const transparent = `transparent=true`
  const width = `width=256`
  const height = `height=256`
  const crs = `${layer.serviceVersion === '1.3.0' || layer.serviceVersion === '2.2.0' ? 'crs' : 'srs'}=EPSG:3857` // NB. srs for older versions than 1.3.0

  return `${layer.serviceUrl}?request=GetMap&service=${layer.type}&version=${layer.serviceVersion}&layers=${layer.name}&${crs}&${format}&${transparent}&${width}&${height}&bbox={bbox-epsg-3857}&styles=`
}
