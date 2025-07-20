<script setup lang="ts">
const items = ['fr', 'en']
</script>

<template>
  <UButton
    v-for="item in items"
    key="item"
    class="hover:cursor-pointer uppercase"
    color="neutral"
    variant="link"
    :label="item"
    size="lg"
    :active="$i18n.locale === item"
    activeVariant="outline"
    @click="$i18n.locale = item"
  />
</template>
