<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const open = ref(false)
const appStore = useAppStore()
const { baseMapKey } = storeToRefs(appStore)
const items = ['voyager', 'positron', 'dark']
</script>

<template>
  <UPopover
    v-model:open="open"
    :dismissible="false"
    :ui="{ content: 'p-4' }"
    :content="{ side: 'left', align: 'start' }"
  >
    <UButton
      class="hover:cursor-pointer"
      icon="i-lucide-map"
      size="lg"
      color="neutral"
      variant="soft"
      title="Configure base map style"
      :active="open"
      activeColor="primary"
      activeVariant="solid"
    />

    <template #content>
      <div class="flex items-center gap-4 mb-4 min-w-[400px]">
        <h2 class="flex-grow text-highlighted font-semibold">Base map style</h2>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="open = false"
        />
      </div>

      <div class="grid grid-cols-3 gap-2 pb-2">
        <button
          v-for="item in items"
          key="item"
          class="bm-style__item"
          :class="{ active: baseMapKey === item }"
          @click="() => (baseMapKey = item)"
          :title="$t('map.menu.basemap.item.tooltip')"
        >
          <div class="w-16 h-16 bg-primary rounded-lg"></div>
          <span>{{ item }}</span>
        </button>
      </div>
    </template>
  </UPopover>
</template>

<style lang="css" scoped>
.bm-style__item {
  border: 1px solid rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  border-radius: var(--radius-md);
  padding-inline: calc(var(--spacing) * 4);
  padding-top: calc(var(--spacing) * 3);
  padding-bottom: calc(var(--spacing) * 2);
  text-transform: capitalize;

  &.active {
    border: 1px solid var(--ui-primary);
    background-color: rgba(255, 255, 255, 0.082);
  }

  &:hover:not(.active) {
    border: 1px solid rgba(255, 255, 255, 0.267);
    background-color: rgba(255, 255, 255, 0.082);
    cursor: pointer;
  }
}
</style>
