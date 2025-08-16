<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  MTLayerTypeEnum,
  useAppStore,
  type MTLayerDefinition,
} from '@/stores/app'

const props = defineProps<{
  layer: MTLayerDefinition
}>()
const appStore = useAppStore()
const color = ref(props.layer.color)

watch(color, (c) => appStore.mutateLayerColor(props.layer.name, c))
</script>

<template>
  <!-- If layer has feature, it can be customized -->
  <template
    v-if="
      [
        MTLayerTypeEnum.WFS,
        MTLayerTypeEnum.GeoJSON,
        MTLayerTypeEnum.GPX,
      ].includes(layer.type)
    "
  >
    <UPopover>
      <UButton
        variant="ghost"
        icon="i-lucide-grip"
        :style="{ color: layer.color }"
      />

      <template #content>
        <UColorPicker v-model="color" class="p-2" />
      </template>
    </UPopover>
  </template>

  <!-- Layer is raster or not cutomizable -->
  <template v-else>
    <UButton
      :color="layer.error ? 'neutral' : 'primary'"
      variant="ghost"
      icon="i-lucide-image"
      :disabled="true"
    />
  </template>
</template>
