<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col flex-col-reverse">
    <header class="h-12 max-h-12 mx-6 flex gap-2 items-center overflow-hidden">
      <img class="logo" src="./assets/logo.svg" height="40px" width="40px" />
      <span class="text-lg">Maposaurus</span>

      <p class="ml-10 text-sm">
        © 2025 Maposaurus by <b>Machine-a-coudre</b> - All rights reserved
      </p>
      <!-- <nav class="ml-10 flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
img.logo {
  filter: brightness(0) invert(1);
}
</style>
