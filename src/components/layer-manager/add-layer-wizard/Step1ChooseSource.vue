<script setup lang="ts">
import { ref } from 'vue'
import Step2FromService from './Step2FromService.vue'

const step = ref(1)
</script>

<template>
  <template v-if="step === 1">
    <p class="uppercase text-sm">A partir de</p>
    <div class="grid grid-cols-3 w-full">
      <UButton
        class="flex flex-col hover:cursor-pointer"
        color="neutral"
        variant="ghost"
        :disabled="true"
      >
        <UIcon name="i-lucide-book-open-text" class="size-15" />
        <span>du catalogue</span>
      </UButton>

      <UButton
        class="flex flex-col hover:cursor-pointer"
        color="neutral"
        variant="ghost"
        @click="step = 2"
      >
        <UIcon name="i-lucide-server-cog" class="size-15" />
        <span>Service (WFS, WMS, WMTS, ...)</span>
      </UButton>

      <UButton
        class="flex flex-col hover:cursor-pointer"
        color="neutral"
        variant="ghost"
        :disabled="true"
      >
        <UIcon name="i-lucide-file-down" class="size-15" />
        <span>un fichier</span>
      </UButton>
    </div>
  </template>

  <template v-if="step === 2">
    <Step2FromService @back="step = 1" />
  </template>
</template>
