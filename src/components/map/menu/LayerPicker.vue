<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
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
      icon="i-lucide-layers"
      size="lg"
      color="neutral"
      variant="soft"
      title="Add a layer to the map"
      :active="open"
      activeColor="primary"
      activeVariant="solid"
    />

    <template #content>
      <div class="flex items-center gap-4 mb-4 justify-between">
        <h2 class="text-highlighted font-semibold">Browse layers</h2>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="open = false"
        />
      </div>

      <UButton
        icon="i-lucide-map"
        size="lg"
        color="neutral"
        variant="soft"
      /><UButton
        icon="i-lucide-map"
        size="lg"
        color="neutral"
        variant="soft"
      /><UButton
        icon="i-lucide-map"
        size="lg"
        color="neutral"
        variant="soft"
      /><UButton icon="i-lucide-map" size="lg" color="neutral" variant="soft" />
      <UButton
        icon="i-lucide-map"
        size="lg"
        color="neutral"
        variant="soft"
      /><UButton
        icon="i-lucide-map"
        size="lg"
        color="neutral"
        variant="soft"
      /><UButton
        icon="i-lucide-map"
        size="lg"
        color="neutral"
        variant="soft"
      /><UButton
        icon="i-lucide-map"
        size="lg"
        color="neutral"
        variant="soft"
      /><UButton icon="i-lucide-map" size="lg" color="neutral" variant="soft" />
    </template>
  </UPopover>
</template>
