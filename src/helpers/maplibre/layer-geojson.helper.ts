import { type Map } from 'maplibre-gl'
import { type MTLayerDefinition } from '@/stores/app'
import { createLayerPolygon } from './layer-geom-polygon.helper'
import {
  createLayerPoint,
  createLayerPointIcon,
} from './layer-geom-point.helper'
import { createLayerLine } from './layer-geom-line.helper copy'

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

  map.addLayer(createLayerLine(layer))
  map.addLayer(createLayerPolygon(layer))

  for (const s of Object.values(styles['Point'])) {
    if (s.icon) {
      const image = await map.loadImage(s.icon)
      map.addImage(`${layer.name}-point-icon-${s.styleUrl}`, image.data)
      map.addLayer(createLayerPointIcon(layer, s.styleUrl))
    } else {
      map.addLayer(createLayerPoint(layer))
    }
  }
}
