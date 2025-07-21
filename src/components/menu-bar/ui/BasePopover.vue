<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const open = ref(false)
</script>

<template>
  <UPopover
    v-model:open="open"
    :dismissible="false"
    :ui="{ content: 'p-4' }"
    :content="{ side: 'left', align: 'start' }"
  >
    <!-- Trigger button to open the popover -->
    <slot name="trigger" :open="open"></slot>

    <!-- Content of the popover -->
    <template #content>
      <!-- Title and close button -->
      <div class="flex items-center gap-4 mb-4 min-w-[400px]">
        <h2 class="flex-grow text-highlighted font-semibold">{{ title }}</h2>

        <UButton
          class="cursor-pointer"
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          :title="$t('map.menu.basepopover.close.button.tooltip')"
          @click="open = false"
        />
      </div>

      <!-- Body content -->
      <slot name="content"></slot>
    </template>
  </UPopover>
</template>
