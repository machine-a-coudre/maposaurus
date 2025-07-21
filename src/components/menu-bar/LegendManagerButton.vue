<template>
  <BasePopover :title="$t('map.menu.legends.title')">
    <template #trigger="{ open }">
      <BaseButton
        icon="i-lucide-scroll-text"
        :title="$t('app.wip')"
        :active="open"
      />
    </template>

    <template #content>
      <LegendManager />
    </template>
  </BasePopover>
</template>
