<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const projs = ['WGS84']
const proj = ref(projs[0])
</script>

<template>
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

  <UAlert
    color="warning"
    variant="subtle"
    :title="'Oops'"
    :description="$t('app.wip')"
    icon="i-lucide-bone"
  />
</template>
