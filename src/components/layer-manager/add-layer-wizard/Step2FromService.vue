<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  getCapabilities,
  type MTServiceProtocol,
  type MTServiceVersion,
} from '@/helpers/mapServices.utils'
import { useAppStore, type LayerDefinition } from '@/stores/app'
import { useNotify } from '@/composables/notify'

const { notifyError } = useNotify()
const appStore = useAppStore()

const serviceUrl = ref('https://mapsref.brgm.fr/wxs/georisques/risques') // eg. https://mapsref.brgm.fr/wxs/georisques/risques?SERVICE=WFS&REQUEST=GetCapabilities
const servicesLayers = ref<{ name: string; title: string; abstract: string }[]>(
  [],
)
const serviceCapabilities = shallowRef(undefined)
const serviceProtocol = ref<MTServiceProtocol>('WFS')
const serviceVersion = ref<MTServiceVersion>('2.2.0')

async function onClickGetServiceLayers(url: string) {
  servicesLayers.value = []
  try {
    serviceCapabilities.value = await getCapabilities(
      url,
      serviceProtocol.value,
      serviceVersion.value,
    )
  } catch (e) {
    notifyError({
      title: `Unable to contact service`,
      description: (<Error>e).message,
    })
  }
}

function onClickLayerItem(layer: Record<string, string>) {
  const { name } = layer
  const url = `${serviceUrl.value}?service=WFS&request=GetFeature&version=2.0.0&srsName=EPSG%3A4326&typeNames=${encodeURIComponent(name)}&outputFormat=${encodeURIComponent('application/json; subtype=geojson; charset=utf-8')}`
  const visibility = true
  const type = serviceProtocol.value

  // TODO: move layer creation
  appStore.addLayerToCollection(<LayerDefinition>{
    ...layer,
    url,
    type,
    visibility,
    serviceUrl: serviceUrl.value,
    serviceVersion: serviceVersion.value,
  })
}
</script>

<template>
  <div class="flex flex-col gap-4 pb-2">
    <UButton
      class="uppercase text-sm m-0 p-0 cursor-pointer"
      color="neutral"
      variant="link"
      size="sm"
      icon="i-lucide-chevron-left"
      label="A partir d'un service"
      @click="$emit('back')"
    />

    <div>
      <template v-if="!serviceCapabilities?.layers?.length">
        <UFormField
          label="Url du service"
          description="à partir de laquelle interroger la liste des couches"
        >
          <UInput
            class="w-full"
            placeholder="https://service.org/wxs/example"
            :ui="{ trailing: 'pe-1' }"
            v-model="serviceUrl"
          >
            <template v-if="serviceUrl?.length" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-circle-x"
                aria-label="Clear input"
                @click="serviceUrl = ''"
              />
            </template>
          </UInput>

          <div class="mt-3 flex gap-2">
            <UButton
              v-for="protocol in <MTServiceProtocol[]>['WFS', 'WMS', 'WMTS']"
              :key="protocol"
              class="text-xs hover:cursor-pointer"
              variant="outline"
              color="neutral"
              :active="serviceProtocol === protocol"
              activeColor="primary"
              @click="serviceProtocol = protocol"
              >{{ protocol }}</UButton
            >

            <UButton
              v-for="version in <MTServiceVersion[]>[
                '1.0.0',
                '1.1.0',
                '1.3.0',
                '2.2.0',
              ]"
              :key="version"
              class="text-xs hover:cursor-pointer"
              variant="outline"
              color="neutral"
              activeColor="primary"
              :active="serviceVersion === version"
              :title="version"
              @click="serviceVersion = version"
              >{{ version }}</UButton
            >
          </div>
        </UFormField>

        <UButton
          class="hover:cursor-pointer w-full mt-4 mb-2"
          icon="i-lucide-cloud-download"
          size="lg"
          color="primary"
          variant="solid"
          :active="true"
          :label="$t('Obtenir la liste des couches du service')"
          :disabled="!serviceUrl"
          loading-auto
          @click="onClickGetServiceLayers(serviceUrl)"
        />
      </template>

      <template v-else="serviceCapabilities?.layers?.length">
        <p class="font-bold">{{ serviceCapabilities?.title }}</p>
        <p
          class="text-sm"
          v-if="serviceCapabilities?.title !== serviceCapabilities?.abstract"
        >
          {{ serviceCapabilities?.abstract }}
        </p>
        <p class="text-sm">{{ serviceUrl }}</p>
        <p class="text-sm">{{ serviceProtocol }} {{ serviceVersion }}</p>

        <UInput
          class="my-4 w-full"
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search..."
        />

        <ul class="flex flex-col gap-1" v-if="serviceCapabilities">
          <li
            v-for="layer in serviceCapabilities.layers"
            :key="layer.name"
            class="flex"
          >
            <Step2FromServiceLayersItem
              :layer="layer"
              @select="onClickLayerItem(layer)"
            />
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
