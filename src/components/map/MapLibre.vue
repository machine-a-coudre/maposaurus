<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import 'maplibre-gl/dist/maplibre-gl.css'

import { useMapLibre } from '@/composables/maplibre'
import { useAppStore } from '@/stores/app'

const props = defineProps<{
  containerId?: string
  mode?: 'map' | 'globe'
}>()

const appStore = useAppStore()
const { mapReady } = storeToRefs(appStore)

useMapLibre(props.containerId, props.mode)

watch(mapReady, async (r) => {
  // TODO: move in maplibre composable
  if (r) {
  }
})
</script>

<template>
  <slot />
</template>
