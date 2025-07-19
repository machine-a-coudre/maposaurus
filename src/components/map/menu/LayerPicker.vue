<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const showLayer = ref(true)
</script>

<template>
  <UPopover
    v-model:open="open"
    :dismissible="false"
    :ui="{ content: 'p-4' }"
    :content="{ side: 'left', align: 'start' }"
  >
    <UChip inset :text="1" size="3xl">
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
    </UChip>

    <template #content>
      <div class="flex items-center gap-4 mb-4 justify-between min-w-[500px]">
        <h2 class="text-highlighted font-semibold">Browse layers</h2>

        <UButton
          class="cursor-pointer"
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
        :placeholder="$t('map.menu.layers.search.placeholder')"
      />

      <div class="mt-8">
        <h4>Liste des couches :</h4>

        <div class="flex items-center gap-2 px-0 py-1">
          <UButton
            class="hover:cursor-pointer"
            color="neutral"
            variant="ghost"
            @click="showLayer = !showLayer"
            :icon="showLayer ? 'i-lucide-eye' : 'i-lucide-eye-closed'"
            :title="$t('map.menu.layers.item.toggle.tooltip')"
          />
          <span
            class="flex-grow"
            title="Points de baignade - Saison balnéaire 2024"
          >
            Points de baignade - Saison balnéaire 2024
          </span>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-paintbrush"
            :title="$t('map.menu.layers.item.styling.tooltip')"
            :disabled="true"
          />
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-square-x"
            :title="$t('map.menu.layers.item.remove.tooltip')"
          />
        </div>

        <UButton
          class="hover:cursor-pointer w-full mt-4 mb-2"
          icon="i-lucide-folder-plus"
          size="lg"
          color="neutral"
          variant="soft"
          title="Add a layer to the map"
          :active="open"
          activeColor="primary"
          activeVariant="solid"
          label="Add new layer"
        />
      </div>
    </template>
  </UPopover>
</template>
