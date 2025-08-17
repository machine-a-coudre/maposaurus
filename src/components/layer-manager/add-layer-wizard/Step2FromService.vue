<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import {
  getCapabilities,
  type MTServiceCapabilities,
  type MTServiceProtocol,
  type MTServiceVersion,
} from '@/helpers/mapServices.helper'
import {
  MTLayerTypeEnum,
  useAppStore,
  type MTLayerDefinition,
  type MTLayerType,
} from '@/stores/app'
import { useNotify } from '@/composables/notify'
import { searchPatternInLayers } from '@/helpers/search.helper'
import { LngLatBounds } from 'maplibre-gl'
import { getBbox } from '@/helpers/maplibre/zoom.helper'

const { notifyError } = useNotify()
const appStore = useAppStore()

const serviceUrl = ref('https://mapsref.brgm.fr/wxs/georisques/risques') // eg. https://mapsref.brgm.fr/wxs/georisques/risques?SERVICE=WFS&REQUEST=GetCapabilities
const servicesLayers = ref<{ name: string; title: string; abstract: string }[]>(
  [],
)
const serviceCapabilities = shallowRef<MTServiceCapabilities | undefined>(
  undefined,
)
const serviceProtocol = ref<MTServiceProtocol>('WFS')
const serviceVersion = ref<MTServiceVersion>('1.3.0')
const searchPattern = ref('')
const layers = computed(() =>
  serviceCapabilities.value?.layers
    ? searchPatternInLayers(
        <MTLayerDefinition[]>serviceCapabilities.value.layers,
        searchPattern.value,
      )
    : [],
)

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

function onClickLayerItem(layer: Record<string, any>) {
  console.log(layer)

  appStore.addLayerToCollection({
    ...layer,
    type: <MTLayerType>serviceProtocol.value.toLowerCase(),
    serviceUrl: serviceUrl.value,
    serviceVersion: serviceVersion.value,
    legend: layer.styles ? layer.styles[0]?.legendUrl : undefined,
    bbox: getBbox(layer),
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
                '1.1.1',
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
          :label="$t('map.menu.layers.addnewlayer.getlayers.button.label')"
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
          trailing-icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search..."
          v-model="searchPattern"
        >
          <template v-if="searchPattern?.length" #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-circle-x"
              aria-label="Clear input"
              @click="searchPattern = ''"
            />
          </template>
        </UInput>

        <ul class="flex flex-col gap-1" v-if="layers.length">
          <li v-for="layer in layers" :key="layer.name" class="flex">
            <Step2FromServiceLayersItem
              :layer="{
                ...layer,
                serviceVersion,
                serviceUrl,
                type: <MTLayerTypeEnum>serviceProtocol.toLocaleLowerCase(),
              }"
              @select="onClickLayerItem(layer)"
            />
          </li>
        </ul>
        <div class="italic" v-else>pas de couche</div>
      </template>
    </div>
  </div>
</template>
