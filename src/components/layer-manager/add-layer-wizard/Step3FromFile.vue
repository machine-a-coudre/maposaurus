<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TabsItem } from '@nuxt/ui'
import {
  MTLayerTypeEnum,
  useAppStore,
  type MTLayerDefinition,
} from '@/stores/app'
import { getFileContentAsGeoJson } from '@/helpers/fileReader.helper'

const appStore = useAppStore()
const activeTab = ref('0')
const file = ref<File>()
const layerName = ref('')
const layerAbstract = ref('')
const layerData = ref('')
const items = [
  {
    label: 'Upload a file',
    slot: 'upload' as const,
  },
  {
    label: 'Paste content',
    slot: 'paste' as const,
  },
] satisfies TabsItem[]

async function onValidate() {
  let layer: MTLayerDefinition
  let data: string = ''
  let type = MTLayerTypeEnum.GeoJSON
  let origin = 'input'

  if (activeTab.value === '0' && file.value) {
    type = file.value.type.includes('gpx') ? MTLayerTypeEnum.GPX : type
    origin = file.value.name

    data = await getFileContentAsGeoJson(file.value)
  }

  if (activeTab.value === '1' && layerData.value) {
    data = JSON.parse(layerData.value)
  }

  layer = <MTLayerDefinition>{
    name: layerName.value,
    abstract: layerAbstract.value,
    title: layerName.value,
    type,
    data,
    origin,
  }

  appStore.addLayerToCollection(layer)
  appStore.toggleFocusOnLayer(layer)
}

watch(file, async (f) => {
  if (!f) return

  layerName.value = f.name.split('.').shift()
})
</script>

<template>
  <div>
    <UButton
      class="uppercase text-sm m-0 p-0 cursor-pointer"
      color="neutral"
      variant="link"
      size="sm"
      icon="i-lucide-chevron-left"
      label="Retour"
      @click="$emit('back')"
    />

    <UTabs
      color="neutral"
      v-model="activeTab"
      :items="items"
      :ui="{ trigger: 'grow' }"
      class="gap-4 w-full mb-4"
    >
      <template #upload="{ item }">
        <UFileUpload
          v-model="file"
          icon="i-lucide-file"
          label="Drop your file here"
          description="GeoJSON, JSON, GPX (max. 2MB)"
          layout="list"
          color="neutral"
          highlight
          :interactive="false"
          class="min-h-48"
          accept=".json,.geojson,.txt,.gpx,.kml"
        >
          <template #actions="{ open }">
            <UButton
              label="Select file"
              icon="i-lucide-archive"
              color="neutral"
              variant="outline"
              @click="open()"
            />
          </template>

          <template #files-bottom="{ removeFile, files }">
            <UButton
              v-if="files?.length"
              label="Remove all files"
              color="neutral"
              @click="removeFile()"
            />
          </template>
        </UFileUpload>
      </template>

      <template #paste="{ item }">
        <UTextarea
          class="w-full"
          color="neutral"
          variant="subtle"
          placeholder="Paste something..."
          :rows="6"
          v-model="layerData"
        />
      </template>
    </UTabs>

    <UFormField label="Layer name">
      <UInput v-model="layerName" placeholder="Name" type="text" class="w-full">
      </UInput>
    </UFormField>

    <UFormField label="Layer abstract">
      <UInput
        v-model="layerAbstract"
        placeholder="Abstract"
        type="text"
        class="w-full"
      >
      </UInput>
    </UFormField>

    <UButton
      class="hover:cursor-pointer w-full mt-4 mb-2"
      icon="i-lucide-upload"
      size="lg"
      color="primary"
      variant="solid"
      :active="true"
      :label="$t('map.menu.layers.addnewlayer.button.label')"
      :disabled="!layerName"
      @click="onValidate"
    />
  </div>
</template>
