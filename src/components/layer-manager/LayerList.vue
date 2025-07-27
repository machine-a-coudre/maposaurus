<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { mapLayersCollection } = storeToRefs(appStore)
</script>

<template>
  <LayerListItem
    class="flex items-center gap-2 px-0 py-1"
    v-for="layer in mapLayersCollection"
    :key="layer.name"
    :layer="layer"
  />
</template>
