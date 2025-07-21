<template>
  <BasePopover :title="$t('map.menu.basemapmanager.title')">
    <template #trigger="{ open }">
      <BaseButton
        icon="i-lucide-map"
        :title="$t('map.menu.basemapmanager.tooltip')"
        :active="open"
      />
    </template>

    <template #content>
      <BasemapManager />
    </template>
  </BasePopover>
</template>
