import { type Map } from 'maplibre-gl'
import { MTLayerTypeEnum, type MTLayerDefinition } from '@/stores/app'
import { addGeojsonLayerToMap } from './layers-geojson.helper'
import { addWFSLayerToMap } from './layers-wfs.helper'
import { addWMXSLayerToMap } from './layers-wmxs.helper'

export function removeLayerMapLibre(map: Map, layer: MTLayerDefinition) {
  map.getStyle().layers.forEach((l) => {
    if (l.id.includes(layer.name)) {
      map.removeLayer(l.id)
    }
  })

  map.getSource(layer.name) && map.removeSource(layer.name)
}

export function mutateLayerMaplibre(map: Map, layer: MTLayerDefinition) {
  map.getStyle().layers.forEach((l) => {
    if (l.id.includes(layer.name)) {
      map.setLayoutProperty(
        l.id,
        'visibility',
        layer.visibility ? 'visible' : 'none',
      )
    }
  })

  map.getLayer(`${layer.name}-circle`) &&
    map.setPaintProperty(`${layer.name}-circle`, 'circle-color', layer.color)

  map.getLayer(`${layer.name}-line`) &&
    map.setPaintProperty(`${layer.name}-line`, 'line-color', layer.color)

  map.getLayer(`${layer.name}-fill`) &&
    map.setPaintProperty(`${layer.name}-fill`, 'fill-color', layer.color)
}

export async function addLayerToMap(map: Map, layer: MTLayerDefinition) {
  if (
    layer.type === MTLayerTypeEnum.GeoJSON ||
    layer.type === MTLayerTypeEnum.GPX
  ) {
    addGeojsonLayerToMap(map, layer, <GeoJSON.GeoJSON>layer.data)
  } else if (layer.type === MTLayerTypeEnum.WFS) {
    await addWFSLayerToMap(map, layer)
  } else if (
    layer.type === MTLayerTypeEnum.WMS ||
    layer.type === MTLayerTypeEnum.WMTS
  ) {
    addWMXSLayerToMap(map, layer)
  } else {
    throw new Error('[Error] Maplibre.util:: Unknown layer type.')
  }
}
