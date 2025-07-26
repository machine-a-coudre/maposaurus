<script setup lang="ts">
import type { Mtheme } from '@/helpers/themes.utils'

defineProps<{
  theme: Mtheme
}>()
</script>

<template>
  <div class="my-6 ml-5 flex gap-4 items-center">
    <div class="w-20 h-20 bg-primary rounded-sm opacity-50"></div>
    <div>
      <h5 class="font-bold">{{ theme.label }}</h5>
      <p>{{ theme.abstract }}</p>
      <ULink :to="theme.link" class="text-primary">{{ theme.link }}</ULink>
    </div>
  </div>
</template>
