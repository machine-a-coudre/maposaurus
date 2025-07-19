<script setup lang="ts">
import MapLibre from './MapLibre.vue'

export type ChoupiMapMode = 'map' | 'globe'

const props = withDefaults(
  defineProps<{
    extent?: any // TODO: typing
    mode?: ChoupiMapMode
  }>(),
  {
    mode: 'map',
  },
)
</script>

<template>
  <div class="relative h-full">
    <MapLibre :mode="mode" :container-id="'map'">
      <div id="map" class="w-full h-screen" />
    </MapLibre>
  </div>
</template>

<style scoped></style>
