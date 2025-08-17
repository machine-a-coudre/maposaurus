<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { mapLayersCollection } = storeToRefs(appStore)
</script>

<template>
  <ul class="flex flex-col gap-3">
    <li
      v-for="layer in mapLayersCollection.toReversed()"
      :key="layer.name"
      :class="{ 'opacity-60': !layer.visibility }"
    >
      {{ layer.name }}
      <div v-if="layer.legend" class="bg-white">
        <img :src="layer.legend" />
      </div>
      <div class="italic opacity-75" v-else>pas de légende disponible</div>
    </li>
  </ul>
</template>
