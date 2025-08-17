<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { searchPatternInLayers } from '@/helpers/search.helper'
import LayerInfo from './LayerInfo.vue'

const appStore = useAppStore()
const { showLayerInfo, mapLayersCollection } = storeToRefs(appStore)
const overlay = useOverlay()
const modal = overlay.create(LayerInfo)
const searchPattern = ref('')
const layers = computed(() =>
  searchPatternInLayers(mapLayersCollection.value, searchPattern.value),
)

watch(showLayerInfo, (layer) => layer && modal.open({ layer }))
</script>

<template>
  <UInput
    class="w-full"
    trailing-icon="i-lucide-search"
    size="md"
    variant="outline"
    :placeholder="$t('map.menu.layers.search.placeholder')"
    v-model="searchPattern"
  >
    <template v-if="searchPattern?.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="searchPattern = ''"
      />
    </template>
  </UInput>

  <div class="mt-8 max-h-dvh overflow-y-auto">
    <LayerList :layers="layers" />

    <UModal
      :overlay="false"
      :title="$t('map.menu.layers.addnewlayer.modale.title')"
    >
      <UButton
        class="hover:cursor-pointer w-full mt-4 mb-2"
        icon="i-lucide-folder-plus"
        size="lg"
        color="primary"
        variant="solid"
        :active="true"
        :label="$t('map.menu.layers.addnewlayer.button.label')"
        :title="$t('map.menu.layers.addnewlayer.button.tooltip')"
        @click="$emit('addNewLayer')"
      />

      <template #body>
        <Step1ChooseSource />
      </template>
    </UModal>
  </div>

  <LayerInfo />
</template>
