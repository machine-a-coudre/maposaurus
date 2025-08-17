import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type {
  MTServiceProtocol,
  MTServiceVersion,
} from '@/helpers/mapServices.helper'

export enum MTLayerTypeEnum {
  WMS = 'wms',
  WMTS = 'wmts',
  WFS = 'wfs',
  TMS = 'tms',
  XYZ = 'xyz',
  GeoJSON = 'geojson',
  GPX = 'gpx',
}

export type MTLayerType = MTLayerTypeEnum | MTServiceProtocol

export type MTLayerDefinition = {
  name: string
  abstract: string
  bbox?: number[]
  data?: unknown
  title: string
  visibility: boolean
  error: boolean
  type: MTServiceProtocol | MTLayerType
  serviceUrl?: string
  serviceVersion?: MTServiceVersion
  origin?: string
  color: string
  legend?: string
}

export const useAppStore = defineStore('app', () => {
  const baseMapKey = ref<string | undefined>('positron')
  const mapMode = ref<string>('map') // TODO: create a sore for the map
  const mapReady = ref(false) // TODO: create a sore for the map
  const mapLayersCollection = shallowRef<MTLayerDefinition[]>([]) // TODO: create a sore for the map
  const showLayerInfo = shallowRef<MTLayerDefinition | undefined>(undefined)
  const focusOnLayer = shallowRef<MTLayerDefinition | undefined>(undefined)

  /**
   * Switch projection mode from map to globe
   */
  function toggleMapMode() {
    mapMode.value = mapMode.value === 'globe' ? 'map' : 'globe'
  }

  /**
   * Add the layer definition to the app layer collection
   * @param layer The layer definition to be added to the collection
   */
  function addLayerToCollection(layer: Partial<MTLayerDefinition>) {
    layer.visibility = true
    layer.color = '#ffc83c'

    if (!mapLayersCollection.value.some((l) => l.name === layer.name)) {
      mapLayersCollection.value = [
        ...mapLayersCollection.value,
        <MTLayerDefinition>layer,
      ]
    }
  }

  function isLayerInCollection(layer: MTLayerDefinition) {
    return mapLayersCollection.value.some(
      (l) =>
        l.name === layer.name &&
        l.serviceVersion === layer.serviceVersion &&
        l.type === layer.type,
    )
  }

  function removeLayerFromCollection(layerName: string) {
    mapLayersCollection.value = mapLayersCollection.value.filter(
      (l) => l.name !== layerName,
    )
  }

  function toggleLayerVisibility(layerName: string) {
    mapLayersCollection.value = mapLayersCollection.value.map((l) =>
      l.name === layerName ? { ...l, visibility: !l.visibility } : l,
    )
  }

  function toggleLayerInfo(layer: MTLayerDefinition | undefined) {
    showLayerInfo.value = layer
  }

  function toggleFocusOnLayer(layer: MTLayerDefinition | undefined) {
    focusOnLayer.value = layer
  }

  function setLayerInError(layerName: string) {
    mapLayersCollection.value = mapLayersCollection.value.map((l) =>
      l.name === layerName ? { ...l, error: true } : l,
    )
  }

  function mutateLayerColor(layerName: string, color: string) {
    mapLayersCollection.value = mapLayersCollection.value.map((l) =>
      l.name === layerName ? { ...l, color } : l,
    )
  }

  return {
    baseMapKey,
    mapMode,
    mapReady,
    mapLayersCollection,
    showLayerInfo,
    focusOnLayer,
    addLayerToCollection,
    isLayerInCollection,
    removeLayerFromCollection,
    toggleMapMode,
    toggleLayerVisibility,
    toggleLayerInfo,
    toggleFocusOnLayer,
    setLayerInError,
    mutateLayerColor,
  }
})
