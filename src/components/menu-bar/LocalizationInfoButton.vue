<template>
  <BasePopover title="Localization info (WIP)">
    <template #trigger="{ open }">
      <BaseButton
        icon="i-lucide-map-pinned"
        :title="$t('map.menu.localizationinfo.tooltip')"
        :active="open"
      />
    </template>

    <template #content>
      <LocalizationInfo />
    </template>
  </BasePopover>
</template>
