import type { GeoJSONSource, Map } from 'maplibre-gl'
import * as turf from '@turf/turf'
import { MTLayerTypeEnum, type MTLayerDefinition } from '@/stores/app'

export async function zoomToFeature(map: Map, layer: MTLayerDefinition) {
  const source = map.getSource(layer.name)

  if (source?.type !== MTLayerTypeEnum.GeoJSON) {
    return // TODO: other sources
  }

  const sourceData = await (<GeoJSONSource>source).getData()
  const features = sourceData
  //{
  //  type: 'FeatureCollection',
  //  features: map.querySourceFeatures(layer.name),
  //}

  const bbox = turf.bbox(<turf.AllGeoJSON>features)

  if (!bbox.every((b) => Number.isFinite(b))) return

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
