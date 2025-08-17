<script setup lang="ts">
import { type MTLayerDefinition } from '@/stores/app'

defineProps<{
  layers?: MTLayerDefinition[]
}>()
</script>

<template>
  <template v-if="layers?.length">
    <LayerListItem
      class="flex items-center gap-2 px-0 py-1"
      v-for="layer in layers.toReversed()"
      :key="layer.name"
      :layer="layer"
    />
  </template>
  <div class="italic" v-else>pas de couche</div>
</template>
