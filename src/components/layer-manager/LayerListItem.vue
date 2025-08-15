<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppStore, type MTLayerDefinition } from '@/stores/app'

const props = defineProps<{
  layer: MTLayerDefinition
}>()

const appStore = useAppStore()
const showLayer = computed(() => props.layer.visibility)
const showLayerTools = ref(false)

function onClickDelete() {
  appStore.removeLayerFromCollection(props.layer.name)
}

function onClickToggleLayerVisibility() {
  appStore.toggleLayerVisibility(props.layer.name)
}
</script>

<template>
  <div
    class="ll__item relative"
    @mouseenter="showLayerTools = true"
    @mouseleave="showLayerTools = false"
  >
    <div
      class="ll__item__title flex-grow w-[350px] max-w-[350px] flex items-center gap-2"
      :class="{
        'italic opacity-60': layer.error,
        'opacity-30': !layer.visibility,
      }"
    >
      <UButton
        :color="layer.error ? 'neutral' : 'primary'"
        variant="ghost"
        :icon="layer.type === 'WFS' ? 'i-lucide-grip' : 'i-lucide-image'"
        :disabled="true"
      />
      <p class="overflow-hidden text-ellipsis truncate">
        <UTooltip :delay-duration="0" :text="`[${layer.name}] ${layer.title}`">
          <span>{{ layer.title }}</span>
        </UTooltip>
        <UBadge
          v-if="layer.error"
          variant="outline"
          color="error"
          class="ml-2"
          size="sm"
        >
          Error
        </UBadge>
      </p>
    </div>

    <div
      class="ll__item__tools absolute right-0 pl-3 bg-default"
      v-if="showLayerTools"
    >
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-paintbrush"
        :title="$t('map.menu.layers.item.styling.tooltip')"
        :disabled="true"
      />
      <UButton
        class="hover:cursor-pointer"
        color="neutral"
        variant="ghost"
        @click.stop.prevent="onClickToggleLayerVisibility"
        :disabled="layer.error"
        :icon="showLayer ? 'i-lucide-eye' : 'i-lucide-eye-closed'"
        :title="$t('map.menu.layers.item.toggle.tooltip')"
      />
      <UButton
        class="hover:cursor-pointer"
        color="neutral"
        variant="ghost"
        icon="i-lucide-square-x"
        :title="$t('map.menu.layers.item.remove.tooltip')"
        @click="onClickDelete"
      />
    </div>
  </div>
</template>
