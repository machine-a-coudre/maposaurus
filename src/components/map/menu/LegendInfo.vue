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
    <BaseButton
      icon="i-lucide-scroll-text"
      :title="$t('app.wip')"
      :active="open"
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

      <UAlert
        color="warning"
        variant="subtle"
        :title="'Oops'"
        :description="$t('app.wip')"
        icon="i-lucide-bone"
      />
    </template>
  </UPopover>
</template>
