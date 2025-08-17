<script setup lang="ts">
import { type MTLayerDefinition } from '@/stores/app'

defineProps<{
  layers?: MTLayerDefinition[]
}>()
</script>

<template>
  <LayerListItem
    class="flex items-center gap-2 px-0 py-1"
    v-for="layer in layers.toReversed()"
    :key="layer.name"
    :layer="layer"
  />
</template>
