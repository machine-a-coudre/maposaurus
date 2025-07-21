<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { getCapabilities } from '@/helpers/services.utils'
import { useAppStore, type LayerDefinition } from '@/stores/app'

const appStore = useAppStore()
const serviceUrl = ref('https://mapsref.brgm.fr/wxs/georisques/risques') // eg. https://mapsref.brgm.fr/wxs/georisques/risques?SERVICE=WFS&REQUEST=GetCapabilities
const servicesLayers = ref<{ name: string; title: string; abstract: string }[]>(
  [],
)
const serviceCapabilities = shallowRef(undefined)

async function onClickGetServiceLayers(url: string) {
  servicesLayers.value = []
  serviceCapabilities.value = undefined

  serviceCapabilities.value = await getCapabilities(url, 'wfs')
  // servicesLayers.value = capabilities.layers

  console.log('serviceCapabilities', serviceCapabilities.value)
}

function onClickLayerItem(
  name: string,
  title: string,
  abstract: string,
  serviceUrl: string,
) {
  const url = `${serviceUrl}?service=WFS&request=GetFeature&version=2.0.0&srsName=EPSG%3A4326&typeNames=${encodeURIComponent(name)}&outputFormat=${encodeURIComponent('application/json; subtype=geojson; charset=utf-8')}`

  // https://mapsref.brgm.fr/wxs/georisques/risques?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:3857&typeName=TOPO_I_CULTURE_LOISIRS_CAMPING

  appStore.addLayerToCollection(<LayerDefinition>{
    name,
    abstract,
    url,
    title,
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
          label="Url du service WFS"
          description="à partir de laquelle interroger la liste des couches"
        >
          <UInput
            class="w-full"
            placeholder="https://mapsref.brgm.fr/wxs/georisques/risques"
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
              class="text-xs"
              variant="outline"
              color="neutral"
              :active="true"
              activeColor="primary"
              >WFS</UButton
            >
            <UButton
              class="text-xs"
              variant="outline"
              color="neutral"
              :disabled="true"
              :title="$t('app.wip')"
              >WMS</UButton
            >
            <UButton
              class="text-xs"
              variant="outline"
              color="neutral"
              :disabled="true"
              :title="$t('app.wip')"
              >WMTS</UButton
            >
            <UButton
              class="text-xs"
              variant="outline"
              color="neutral"
              :disabled="true"
              :title="$t('app.wip')"
              >1.0.0</UButton
            >
            <UButton
              class="text-xs"
              variant="outline"
              color="neutral"
              :disabled="true"
              :title="$t('app.wip')"
              >1.1.0</UButton
            >
            <UButton
              class="text-xs"
              variant="outline"
              color="neutral"
              :active="true"
              activeColor="primary"
              >2.2.0</UButton
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
        <p class="text-sm">WFS 2.0.0</p>

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
            <span
              ><UIcon name="i-lucide-layers-2" size="md" class="mt-2"
            /></span>
            <div class="grow">
              <UButton
                class="hover:cursor-pointer w-full max-w-full font-normal flex flex-col"
                color="neutral"
                variant="ghost"
                @click="
                  onClickLayerItem(
                    layer.name,
                    layer.title,
                    layer.abstract,
                    serviceUrl,
                  )
                "
              >
                <span class="text-left w-full"
                  >{{ layer.title }} <span>({{ layer.name }})</span></span
                >
                <span
                  v-if="layer.abstract && layer.title !== layer.abstract"
                  class="text-left w-full text-xs opacity-65"
                >
                  {{ layer.abstract }}
                </span>
              </UButton>
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
