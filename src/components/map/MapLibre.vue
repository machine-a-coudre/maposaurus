<script setup lang="ts">
import { watch } from 'vue'
import 'maplibre-gl/dist/maplibre-gl.css'

import { useMapLibre } from '@/composables/maplibre'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { useLayerconnector } from '@/composables/layerconnector'

const props = defineProps<{
  containerId?: string
  mode?: string // 'map' | 'globe'
}>()

const appStore = useAppStore()
const { mapReady } = storeToRefs(appStore)
const layerConnector = useLayerconnector()
const mapLibre = useMapLibre(props.containerId, props.mode)

watch(mapReady, async (r) => {
  if (r) {
    const bathingSites = await layerConnector.getBaignadeData()

    mapLibre.map.value?.addSource('bathing-sites', {
      type: 'geojson',
      data: bathingSites,
    })

    mapLibre.map.value?.addLayer({
      id: 'bathing-sites-layer',
      type: 'circle',
      source: 'bathing-sites',
      paint: {
        'circle-radius': 4,
        'circle-color': [
          'match',
          ['get', 'status'],
          'banned',
          '#ff0000', // Rouge pour interdiction
          'open',
          '#007cbf', // Bleu pour ouvert
          '#cccccc', // Gris par défaut
        ],
      },
    })

    mapLibre.map.value?.addLayer({
      id: 'bathing-sites-labels',
      type: 'symbol',
      source: 'bathing-sites',
      layout: {
        'text-field': ['get', 'Nom du site de baignade'],
        'text-size': 11,
        'text-offset': [0, 0.8],
        'text-anchor': 'top',
        'text-font': ['Open Sans Semibold'],
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': [
          'match',
          ['get', 'status'],
          'banned',
          '#ff0000', // Rouge pour interdiction
          'open',
          '#007cbf', // Bleu pour ouvert
          '#cccccc', // Gris par défaut
        ],
        // 'text-halo-color': 'rgba(255,255,255,0.8)',
        // 'text-halo-width': 1,
      },
    })
  }
})
</script>

<template>
  <slot />
</template>
