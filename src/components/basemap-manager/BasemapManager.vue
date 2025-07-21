<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { baseMapKey } = storeToRefs(appStore)
const items = ['voyager', 'positron', 'dark'] // TODO: add more
</script>

<template>
  <div class="grid grid-cols-3 gap-2 pb-2">
    <button
      v-for="item in items"
      :key="item"
      class="bm-style__item"
      :class="{ active: baseMapKey === item }"
      @click="() => (baseMapKey = item)"
      :title="$t('map.menu.basemapmanager.item.tooltip', { name: item })"
    >
      <img
        class="w-16 h-16 bg-primary rounded-lg"
        :alt="item"
        :src="`/img/basemap-${item}.png`"
        width="64"
        height="64"
      />
      <span>{{ item }}</span>
    </button>
  </div>
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
