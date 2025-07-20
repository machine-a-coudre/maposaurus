<script setup lang="ts">
import { ref } from 'vue'

const showLayer = ref(true)
</script>

<template>
  <BasePopover :title="$t('map.menu.layers.title')">
    <template #trigger="{ open }">
      <UChip inset :text="1" size="3xl">
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
          color="primary"
          variant="solid"
          :active="true"
          :label="$t('map.menu.layers.addnewlayer.button.label')"
          :title="$t('map.menu.layers.addnewlayer.button.tooltip')"
        />
      </div>
    </template>
  </BasePopover>
</template>
