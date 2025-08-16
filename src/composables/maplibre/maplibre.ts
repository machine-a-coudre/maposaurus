import { onMounted, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import maplibregl from 'maplibre-gl'

import positronStyle from '@/assets/styles/positron-gl-style.json'
import { useAppStore, type MTLayerDefinition } from '@/stores/app'
import {
  addLayerMaplibre,
  mutateLayerMaplibre,
  removeLayerMapLibre,
} from '../../helpers/maplibre.helper'
import { useNotify } from '../notify'

const PREDEFINED_STYLES = {
  voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  positron: positronStyle, //'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
} as const

export function useMapLibre(containerId = 'map', type = 'map') {
  const { notifyError, notifySuccess } = useNotify()
  const mapRef = shallowRef<maplibregl.Map | undefined>(undefined)
  const appStore = useAppStore()
  const { baseMapKey, mapMode, mapReady, mapLayersCollection } =
    storeToRefs(appStore)

  watch(mapMode, (m) => {
    m &&
      mapRef.value?.setProjection({
        type: m,
      })
  })

  watch(baseMapKey, (k) => {
    if (!k) {
      return
    }

    const map = mapRef.value!
    const sourcesToPreserve = {}
    const layersToPreserve = []

    map.getStyle().layers.forEach((layer) => layersToPreserve.push(layer))

    map.setStyle(PREDEFINED_STYLES[k])

    map.once('styledata', () => {
      // Restore sources
      Object.entries(sourcesToPreserve).forEach(([id, source]) => {
        if (!map.getSource(id)) {
          map.addSource(id, source)
        }
      })

      // Restore layers
      layersToPreserve.forEach((layer) => {
        if (!map.getLayer(layer.id)) {
          if (map.getSource(layer.source)) {
            map.addLayer(layer)
          }
        }
      })

      mapMode.value = 'map'
    })
  })

  watch(
    mapLayersCollection,
    async (
      collection: MTLayerDefinition[],
      oldCollection: MTLayerDefinition[] = [],
    ) => {
      const map = mapRef.value

      if (!map) {
        return
      }

      const removedLayers = oldCollection.filter(
        (l) => !collection.some((ll) => ll.name === l.name),
      )
      const addedLayers = collection.filter(
        (l) => !oldCollection.some((ll) => ll.name === l.name),
      )
      const mutatedLayers = collection.filter((l) => {
        const ll = oldCollection.find((ll) => ll.name === l.name)
        return ll && ll?.visibility !== l.visibility
      })

      removedLayers.forEach((l) => removeLayerMapLibre(map, l))

      mutatedLayers.forEach((l) => mutateLayerMaplibre(map, l))

      for (let i = 0; i < addedLayers.length; i++) {
        const layer = addedLayers[i]
        try {
          addLayerMaplibre(map, layer)

          notifySuccess({
            title: `The layer "${layer.title}" has been successfully added to the map.`,
          })
        } catch (e) {
          appStore.setLayerInError(layer.name)

          notifyError({
            title: `Error for "${layer.title}"`,
            description: `Unable to add layer "[${layer.name}] ${layer.title}" to the map, please check service paramaters or API response.`,
          })
        }
      }
    },
    { immediate: true },
  )

  onMounted(() => {
    mapRef.value = new maplibregl.Map({
      container: containerId,
      style: positronStyle,
      center: [0, 0],
      zoom: 1.5,
    })

    mapRef.value.on('style.load', () => {
      mapReady.value = true
      mapRef.value!.setProjection({ type })
    })

    mapRef.value.addControl(new maplibregl.NavigationControl(), 'top-left')

    mapRef.value.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'metric',
      }),
    )
  })

  return { mapRef }
}
