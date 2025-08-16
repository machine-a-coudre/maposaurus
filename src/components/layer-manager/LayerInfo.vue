<script setup lang="ts">
import { useAppStore, type MTLayerDefinition } from '@/stores/app'

defineProps<{
  layer?: MTLayerDefinition | undefined
}>()

const emit = defineEmits<{ close: [boolean] }>()
const appStore = useAppStore()

function handleClose() {
  appStore.toggleLayerInfo(undefined)
  emit('close', false)
}
</script>

<template>
  <UModal
    @after:leave="handleClose"
    :close="{ onClick: handleClose }"
    :title="$t('layers.layer.info.modal.title')"
  >
    <template #body>
      <div>{{ layer?.name }}</div>
      <div>{{ layer?.title }}</div>
      <div>{{ layer?.serviceUrl }}</div>
      <div>{{ layer?.serviceVersion }}</div>
      <div>{{ layer?.type }}</div>
      <div>{{ layer?.origin }}</div>
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton
          :label="$t('layers.layer.info.modal.dismiss')"
          @click="handleClose"
        />
      </div>
    </template>
  </UModal>
</template>
