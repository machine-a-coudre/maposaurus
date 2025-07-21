import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

export type LayerDefinition = {
  name: string
  abstract: string
  url: string
  title: string
}

export const useAppStore = defineStore('app', () => {
  const baseMapKey = ref<string | undefined>('positron')
  const mapMode = ref<string>('map') // TODO: create a sore for the map
  const mapReady = ref(false) // TODO: create a sore for the map
  const mapLayerCollection = shallowRef<LayerDefinition[]>([]) // TODO: create a sore for the map

  /**
   * Switch projection mode from map to globe
   */
  function toggleMapMode() {
    mapMode.value = mapMode.value === 'globe' ? 'map' : 'globe'
  }

  function addLayerToCollection(layer: LayerDefinition) {
    mapLayerCollection.value = [...mapLayerCollection.value, layer]

    console.log('mapLayerCollection.value', mapLayerCollection.value)
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
