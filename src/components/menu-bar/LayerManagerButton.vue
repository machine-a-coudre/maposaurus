<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { mapLayersCollection } = storeToRefs(appStore)
</script>

<template>
  <BasePopover :title="$t('map.menu.layers.title')">
    <template #trigger="{ open }">
      <UChip
        inset
        size="3xl"
        :text="mapLayersCollection.length"
        :show="!!mapLayersCollection.length"
      >
        <BaseButton
          icon="i-lucide-layers"
          :title="$t('map.menu.layers.tooltip')"
          :active="open"
      /></UChip>
    </template>

    <template #content>
      <LayerManager />
    </template>
  </BasePopover>
</template>
