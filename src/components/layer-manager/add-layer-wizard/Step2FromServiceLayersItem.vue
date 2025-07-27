<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore, type MTLayerDefinition } from '@/stores/app'

const props = defineProps<{
  layer: MTLayerDefinition
}>()

const appStore = useAppStore()
const isAddedToTheMap = computed(() =>
  appStore.isLayerInCollection(props.layer),
)
</script>

<template>
  <UButton
    class="grow hover:cursor-pointer w-full max-w-full font-normal flex items-start"
    color="neutral"
    variant="ghost"
    @click.stop.prevent="!isAddedToTheMap && $emit('select')"
  >
    <span>
      <UIcon
        name="i-lucide-layers-2"
        v-if="!isAddedToTheMap"
        size="md"
        class="mt-1"
      />
      <UIcon
        name="i-lucide-layers"
        v-else
        size="md"
        class="mt-1 text-primary"
      />
    </span>

    <span class="flex flex-col">
      <span class="text-left w-full">{{ layer.title }} </span>
      <span class="text-left w-full">{{ layer.name }}</span>
      <span
        v-if="layer.abstract && layer.title !== layer.abstract"
        class="text-left w-full text-xs opacity-65"
      >
        {{ layer.abstract }}
      </span>
    </span>
  </UButton>
</template>
