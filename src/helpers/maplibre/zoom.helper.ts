import { LngLatBounds, type GeoJSONSource, type Map } from 'maplibre-gl'
import * as turf from '@turf/turf'
import { MTLayerTypeEnum, type MTLayerDefinition } from '@/stores/app'

export async function zoomTo(map: Map, layer: MTLayerDefinition) {
  const source = map.getSource(layer.name)
  let bbox: number[] | undefined

  if (source?.type === MTLayerTypeEnum.GeoJSON) {
    bbox = await zoomToFeature(map, layer)
  } else {
    bbox = layer.bbox
  }

  if (!bbox || !bbox.every((b) => Number.isFinite(b))) return

  map.fitBounds(
    [
      [bbox[0], bbox[1]],
      [bbox[2], bbox[3]],
    ],
    {
      padding: 20,
      duration: 1000,
    },
  )
}

async function zoomToFeature(map: Map, layer: MTLayerDefinition) {
  const source = <GeoJSONSource>map.getSource(layer.name)
  const sourceData = await source.getData()
  const features = sourceData

  //{
  //  type: 'FeatureCollection',
  //  features: map.querySourceFeatures(layer.name),
  //}

  return turf.bbox(<turf.AllGeoJSON>features)
}

export function getBbox(layer: Record<string, any>) {
  const boundingBoxes =
    layer.boundingBoxes && layer.boundingBoxes['EPSG:4326']
      ? layer.boundingBoxes['EPSG:4326']
      : undefined
  const bounds = boundingBoxes
    ? new LngLatBounds(
        [boundingBoxes[0], boundingBoxes[1]],
        [boundingBoxes[2], boundingBoxes[3]],
      )
    : undefined
  const bbox = bounds
    ? [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
    : undefined

  return bbox
}
