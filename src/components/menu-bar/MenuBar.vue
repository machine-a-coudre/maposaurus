<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { mapMode } = storeToRefs(appStore)
const { t } = useI18n()
</script>

<template>
  <div class="menuBar flex flex-col gap-1">
    <ThemeManagerButton />
    <LayerManagerButton />
    <LegendManagerButton />
    <BaseButton
      class="mt-6"
      icon="i-lucide-pencil-ruler"
      :title="$t('app.wip')"
      :disabled="true"
    />
    <LocalizationInfoButton />
    <BaseButton
      icon="i-lucide-message-circle-question-mark"
      :title="$t('app.wip')"
      :disabled="true"
    />
    <BaseButton
      icon="i-lucide-printer"
      :title="$t('app.wip')"
      :disabled="true"
    />
    <BaseButton icon="i-lucide-save" :title="$t('app.wip')" :disabled="true" />
    <BasemapManagerButton class="mt-6" />
    <BaseButton
      icon="i-lucide-box"
      :title="t('map.menu.3d.tooltip')"
      :active="mapMode === 'globe'"
      @click="appStore.toggleMapMode"
    />
  </div>
</template>
