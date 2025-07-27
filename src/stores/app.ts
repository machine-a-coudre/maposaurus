import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

export type MTLayerDefinition = {
  name: string
  abstract: string
  url: string
  title: string
  visibility: boolean
  error: boolean
}

export const useAppStore = defineStore('app', () => {
  const baseMapKey = ref<string | undefined>('positron')
  const mapMode = ref<string>('map') // TODO: create a sore for the map
  const mapReady = ref(false) // TODO: create a sore for the map
  const mapLayersCollection = shallowRef<MTLayerDefinition[]>([]) // TODO: create a sore for the map

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
  function addLayerToCollection(layer: MTLayerDefinition) {
    if (!mapLayersCollection.value.some((l) => l.name === layer.name)) {
      mapLayersCollection.value = [...mapLayersCollection.value, layer]
    }
  }

  function isLayerInCollection(layer: MTLayerDefinition) {
    return mapLayersCollection.value.some((l) => l.name === layer.name)
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

  function setLayerInError(layerName: string) {
    mapLayersCollection.value = mapLayersCollection.value.map((l) =>
      l.name === layerName ? { ...l, error: true } : l,
    )
  }

  return {
    baseMapKey,
    mapMode,
    mapReady,
    mapLayersCollection,
    addLayerToCollection,
    isLayerInCollection,
    removeLayerFromCollection,
    toggleMapMode,
    toggleLayerVisibility,
    setLayerInError,
  }
})
