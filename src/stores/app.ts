import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

export type MTLayerDefinition = {
  name: string
  abstract: string
  url: string
  title: string
}

export const useAppStore = defineStore('app', () => {
  const baseMapKey = ref<string | undefined>('positron')
  const mapMode = ref<string>('map') // TODO: create a sore for the map
  const mapReady = ref(false) // TODO: create a sore for the map
  const mapLayerCollection = shallowRef<MTLayerDefinition[]>([]) // TODO: create a sore for the map

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
    mapLayerCollection.value = [...mapLayerCollection.value, layer]
  }

  return {
    baseMapKey,
    mapMode,
    mapReady,
    mapLayerCollection,
    addLayerToCollection,
    toggleMapMode,
  }
})
