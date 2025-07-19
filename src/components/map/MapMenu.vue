<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-1">
    <ThemePicker />
    <LayerPicker />
    <LegendInfo />
    <BaseMapStyle />
    <BaseButton
      icon="i-lucide-pencil-ruler"
      :title="t('map.menu.tools.tooltip')"
    />
    <BaseButton
      icon="i-lucide-message-circle-question-mark"
      :title="t('map.menu.question.tooltip')"
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
  </div>
</template>
