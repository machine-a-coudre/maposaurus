<script setup lang="ts">
defineProps<{
  layer: Record<string, string>
}>()
</script>

<template>
  <UButton
    class="grow hover:cursor-pointer w-full max-w-full font-normal flex items-start"
    color="neutral"
    variant="ghost"
    @click.stop.prevent="$emit('select')"
  >
    <span>
      <UIcon name="i-lucide-layers-2" size="md" class="mt-1" />
    </span>

    <span class="flex flex-col">
      <span class="text-left w-full">{{ layer.title }} </span>
      <span class="text-left w-full text-primary">{{ layer.name }}</span>
      <span
        v-if="layer.abstract && layer.title !== layer.abstract"
        class="text-left w-full text-xs opacity-65"
      >
        {{ layer.abstract }}
      </span>
    </span>
  </UButton>
</template>
