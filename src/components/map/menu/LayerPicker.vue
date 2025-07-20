<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { mapLayerCollection } = storeToRefs(appStore)
</script>

<template>
  <BasePopover :title="$t('map.menu.layers.title')">
    <template #trigger="{ open }">
      <UChip inset :text="mapLayerCollection.length + 1" size="3xl">
        <BaseButton
          icon="i-lucide-layers"
          :title="$t('map.menu.layers.tooltip')"
          :active="open"
      /></UChip>
    </template>

    <template #content>
      <UInput
        class="w-full"
        trailing-icon="i-lucide-search"
        size="md"
        variant="outline"
        :placeholder="$t('map.menu.layers.search.placeholder')"
      />

      <div class="mt-8">
        <h4 class="text-sm opacity-75 uppercase">
          {{ $t('map.menu.layers.list.title') }}
        </h4>

        <LayerList />

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
    </template>
  </BasePopover>
</template>
