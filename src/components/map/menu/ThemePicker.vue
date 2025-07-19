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
      icon="i-lucide-book-open"
      size="lg"
      color="neutral"
      variant="soft"
      title="Add a theme to the map"
      :active="open"
      activeColor="primary"
      activeVariant="solid"
    />

    <template #content>
      <div class="flex items-center gap-4 mb-4 justify-between min-w-[500px]">
        <h2 class="text-highlighted font-semibold">Browse themes</h2>

        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="open = false"
        />
      </div>

      <UInput
        class="w-full"
        trailing-icon="i-lucide-search"
        size="md"
        variant="outline"
        :placeholder="$t('map.menu.themes.search.placeholder')"
      />

      <div class="mt-5">Theme sélectionné : Baignade en France 2024</div>
    </template>
  </UPopover>
</template>
