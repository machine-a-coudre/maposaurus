<script setup lang="ts">
import { onMounted, watch } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import style from './styles/positron-gl-style.json'


const props = defineProps<{
  containerId?: string
  mode?: string // 'map' | 'globe'
}>()

let map: maplibregl.Map

watch(
  () => props.mode,
  (mode) => {
    if (map) {
      map.setProjection({
        type: mode,
      })
    }
  },
)

onMounted(() => {
  map = new maplibregl.Map({
    container: props.containerId!,
    style,
    // 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    // 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    // 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', 
    //'https://demotiles.maplibre.org/style.json',
    center: [0, 0],
    zoom: 1.5,
  })

  map.on('style.load', () => {
    map.setProjection({
      type: props.mode,
    })
  })
})
</script>

<template>
  <slot />
</template>
