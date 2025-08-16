import type { Map } from 'maplibre-gl'
import { MTLayerTypeEnum, type MTLayerDefinition } from '@/stores/app'

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

  map.getLayer(`${layer.name}-circle`) &&
    map.setPaintProperty(`${layer.name}-circle`, 'circle-color', layer.color)

  map.getLayer(`${layer.name}-line`) &&
    map.setPaintProperty(`${layer.name}-line`, 'line-color', layer.color)

  map.getLayer(`${layer.name}-fill`) &&
    map.setPaintProperty(`${layer.name}-fill`, 'fill-color', layer.color)
}

export function addLayerToMap(map: Map, layer: MTLayerDefinition) {
  if (
    layer.type === MTLayerTypeEnum.GeoJSON ||
    layer.type === MTLayerTypeEnum.GPX
  ) {
    addGeojsonLayerToMap(map, layer, <GeoJSON.GeoJSON>layer.data)
  } else if (layer.type === MTLayerTypeEnum.WFS) {
    addWFSLayerToMap(map, layer)
  } else if (
    layer.type === MTLayerTypeEnum.WMS ||
    layer.type === MTLayerTypeEnum.WMTS
  ) {
    addWMXSLayerToMap(map, layer)
  } else {
    throw new Error('[Error] Maplibre.util:: Unknown layer type.')
  }
}

async function addGeojsonLayerToMap(
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

async function addWFSLayerToMap(map: Map, layer: MTLayerDefinition) {
  const url = getUrlWfs(layer)
  const req = await fetch(url)

  if (!req.ok) {
    throw new Error(`[Error] Maplibre.util:: ${req.status} ${req.statusText}`)
  }

  const data = await req.json()

  addGeojsonLayerToMap(map, layer, data)
}

async function addWMXSLayerToMap(map: Map, layer: MTLayerDefinition) {
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
