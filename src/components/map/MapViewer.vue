<script setup lang="ts">
withDefaults(
  defineProps<{
    extent?: any // TODO: typing
    mode?: 'map' | 'globe'
  }>(),
  {
    mode: 'map',
  },
)
</script>

<template>
  <div class="relative">
    <MenuBar class="mapViewer__menu bg-auto p-3 absolute right-0 z-[99999]" />
    <MapLibre :mode="mode" :container-id="'map'">
      <div id="map" class="w-full h-[calc(100vh-48px)]" />
    </MapLibre>
  </div>
</template>
