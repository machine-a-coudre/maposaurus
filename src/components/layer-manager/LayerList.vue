<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { mapLayerCollection } = storeToRefs(appStore)
const showLayer = ref(true)

// TODO: refactor
</script>

<template>
  <div
    class="flex items-center gap-2 px-0 py-1"
    v-for="layer in mapLayerCollection"
    :key="layer.name"
  >
    <UButton
      class="hover:cursor-pointer"
      color="neutral"
      variant="ghost"
      @click="showLayer = !showLayer"
      :icon="showLayer ? 'i-lucide-eye' : 'i-lucide-eye-closed'"
      :title="$t('map.menu.layers.item.toggle.tooltip')"
    />
    <div class="flex-grow w-[300px] max-w-[300px]" :title="layer.title">
      <p class="overflow-hidden text-ellipsis truncate">{{ layer.title }}</p>
    </div>
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-paintbrush"
      :title="$t('map.menu.layers.item.styling.tooltip')"
      :disabled="true"
    />
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-square-x"
      :title="$t('map.menu.layers.item.remove.tooltip')"
    />
  </div>
</template>
