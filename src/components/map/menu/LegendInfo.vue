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
      icon="i-lucide-scroll-text"
      size="lg"
      color="neutral"
      variant="soft"
      :title="$t('map.menu.legend.tooltip')"
      :active="open"
      activeColor="primary"
      activeVariant="solid"
    />

    <template #content>
      <div class="flex items-center gap-4 mb-4 justify-between min-w-[400px]">
        <h2 class="text-highlighted font-semibold">Legends</h2>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="open = false"
        />
      </div>

      <h4>Title first layer</h4>
      Legend here (TODO)
    </template>
  </UPopover>
</template>
