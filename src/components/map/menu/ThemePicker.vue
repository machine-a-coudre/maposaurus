<script setup lang="ts">
import { ref } from 'vue'
import type { TabsItem } from '@nuxt/ui'

const items = ref<TabsItem[]>([
  {
    label: 'All',
  },
  {
    label: 'Geology',
  },
  {
    label: 'FR - Summer',
  },
])
</script>

<template>
  <BasePopover :title="$t('map.menu.thememanager.title') + ' (WIP)'">
    <template #trigger="{ open }">
      <BaseButton
        class="mt-6"
        icon="i-lucide-book-open"
        :title="$t('map.menu.thememanager.tooltip')"
        :active="open"
      />
    </template>

    <template #content>
      <div class="min-w-[700px]">
        <UInput
          class="w-full"
          trailing-icon="i-lucide-search"
          size="md"
          variant="outline"
          :placeholder="$t('map.menu.thememanager.search.placeholder')"
        />

        <UTabs
          color="primary"
          variant="link"
          :content="false"
          :items="items"
          class="w-full my-8"
        />

        <div class="mt-5">Theme sélectionné : Baignade en France 2024</div>
      </div>
    </template>
  </BasePopover>
</template>
