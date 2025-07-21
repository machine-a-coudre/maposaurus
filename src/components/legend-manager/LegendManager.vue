<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <UAlert
    color="warning"
    variant="subtle"
    :title="'Oops'"
    :description="$t('app.wip')"
    icon="i-lucide-bone"
  />
</template>
