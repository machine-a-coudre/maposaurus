<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <UApp>
    <div class="flex flex-col-reverse">
      <header
        class="h-12 max-h-12 mx-6 flex gap-2 items-center overflow-hidden"
      >
        <img
          class="logo dark:filter dark:brightness-0 dark:invert"
          src="@/assets/logo.svg"
          height="40px"
          width="40px"
        />
        <span class="text-lg">Maposaurus</span>

        <p class="ml-10 text-sm grow">
          © 2025 Maposaurus by <b>Machine-a-coudre</b>, made in 42. All rights
          reserved.
        </p>

        <div>
          <LanguageSwitcher />
        </div>
        <!-- <nav class="ml-10 flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
      </header>

      <RouterView />
    </div>
  </UApp>
</template>
