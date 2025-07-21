<template>
  <BasePopover :title="$t('map.menu.thememanager.title') + ' (WIP)'">
    <template #trigger="{ open }">
      <BaseButton
        class="mt-6"
        icon="i-lucide-book-open"
        :title="$t('map.menu.thememanager.tooltip')"
        :active="open"
      />
    </template>

    <template #content>
      <ThemeManager />
    </template>
  </BasePopover>
</template>
