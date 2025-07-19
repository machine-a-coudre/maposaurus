<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { mapMode } = storeToRefs(appStore)
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-1">
    <ThemePicker />
    <LayerPicker />
    <LegendInfo />
    <BaseButton
      class="mt-6"
      icon="i-lucide-pencil-ruler"
      :title="t('map.menu.tools.tooltip')"
    />
    <BaseButton
      icon="i-lucide-message-circle-question-mark"
      :title="t('map.menu.question.tooltip')"
      :disabled="true"
    />
    <BaseButton
      icon="i-lucide-printer"
      :title="t('map.menu.print.tooltip')"
      :disabled="true"
    />
    <BaseButton
      icon="i-lucide-save"
      :title="t('map.menu.save.tooltip')"
      :disabled="true"
    />
    <BaseMapStylePicker class="mt-6" />
    <BaseButton
      icon="i-lucide-box"
      :title="t('map.menu.3d.tooltip')"
      :active="mapMode === 'globe'"
      @click="appStore.toggleMapMode"
    />
  </div>
</template>
