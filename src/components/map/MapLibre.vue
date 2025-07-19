<script setup lang="ts">
import { onMounted, watch } from 'vue'
import 'maplibre-gl/dist/maplibre-gl.css'

import { useMapLibre } from '@/composables/maplibre'

const props = defineProps<{
  containerId?: string
  mode?: string // 'map' | 'globe'
}>()

useMapLibre(props.containerId, props.mode)
</script>

<template>
  <slot />
</template>
