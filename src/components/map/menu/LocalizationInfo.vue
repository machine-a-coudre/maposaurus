<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const value = ref('')
const projs = ['WGS84']
const proj = ref(projs[0])
</script>

<template>
  <UPopover
    v-model:open="open"
    :dismissible="false"
    :ui="{ content: 'p-4' }"
    :content="{ side: 'left', align: 'start' }"
  >
    <BaseButton
      icon="i-lucide-map-pinned"
      :title="$t('map.menu.localizationinfo.tooltip')"
      :active="open"
    />

    <template #content>
      <div class="flex items-center gap-4 mb-4 justify-between min-w-[500px]">
        <h2 class="text-highlighted font-semibold">Localization info</h2>

        <UButton
          class="cursor-pointer"
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="open = false"
        />
      </div>

      <UButtonGroup class="mb-4">
        <UInput
          v-model="value"
          placeholder="coordinates"
          :ui="{
            base: 'pl-14.5',
            leading: 'pointer-events-none',
          }"
        >
          <template #leading>
            <p class="text-sm text-muted">ESPG:</p>
          </template>
        </UInput>

        <USelectMenu v-model="proj" :items="projs" />
      </UButtonGroup>
    </template>
  </UPopover>
</template>
