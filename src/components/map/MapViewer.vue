<script setup lang="ts">
import MapLibre from './MapLibre.vue'
import MapMenu from './MapMenu.vue'

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
  <div class="relative">
    <MapMenu class="bg-auto p-3 absolute right-0 z-[99999]" :popover="true" />
    <MapLibre :mode="mode" :container-id="'map'">
      <div id="map" class="w-full h-[calc(100vh-48px)]" />
    </MapLibre>
  </div>
</template>

<style scoped></style>
