import { type Map } from 'maplibre-gl'
import { type MTLayerDefinition } from '@/stores/app'
import { addGeojsonLayerToMap } from './layer-geojson.helper'

export async function addWFSLayerToMap(map: Map, layer: MTLayerDefinition) {
  const url = getUrlWfs(layer)
  const req = await fetch(url)

  if (!req.ok) {
    throw new Error(`[Error] Maplibre.util:: ${req.status} ${req.statusText}`)
  }

  const data = await req.json()

  addGeojsonLayerToMap(map, layer, data)
}

function getUrlWfs(layer: MTLayerDefinition) {
  return `${layer.serviceUrl}?service=WFS&request=GetFeature&version=2.0.0&srsName=EPSG%3A4326&typeNames=${encodeURIComponent(layer.name)}&outputFormat=${encodeURIComponent('application/json; subtype=geojson; charset=utf-8')}`
}
