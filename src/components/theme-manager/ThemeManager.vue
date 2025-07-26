<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import type { TabsItem } from '@nuxt/ui'

import { loadThemes, type Mtheme } from '@/helpers/themes.utils'

const themes = shallowRef<Mtheme[]>([])
const tabs = ref<TabsItem[]>([])
const currentTab = ref<string>('')
const tabSubThemes = computed(() =>
  currentTab.value === 'all'
    ? themes.value.flatMap((t) => t.themes)
    : themes.value.find((t) => t.label === currentTab.value)?.themes,
)

async function getThemes() {
  themes.value = await loadThemes()
  tabs.value = [
    { label: 'All', value: 'all' },
    ...themes.value.map((t) => ({ label: t.label, value: t.label })),
  ]
  currentTab.value = 'all'
}

onMounted(() => getThemes())
</script>

<template>
  <div class="tm w-[800px] min-w-[700px]">
    <UInput
      class="tm__search w-full"
      trailing-icon="i-lucide-search"
      size="md"
      variant="outline"
      :placeholder="$t('map.menu.thememanager.search.placeholder')"
    />

    <UTabs
      color="primary"
      variant="link"
      :content="false"
      :items="tabs"
      v-model="currentTab"
      class="tm__tabs w-full my-8"
    />

    <UAlert
      color="warning"
      variant="subtle"
      :title="'Oops'"
      :description="$t('app.wip')"
      icon="i-lucide-bone"
    />

    <div
      v-if="currentTab === 'Geology' || currentTab === 'all'"
      class="tm__listItem"
    >
      <ThemeItem
        class="tm__item"
        v-for="subTheme in tabSubThemes"
        :key="subTheme!.label"
        :theme="subTheme!"
      />
    </div>
  </div>
</template>
