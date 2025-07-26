import { onMounted, shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import maplibregl from 'maplibre-gl'

import positronStyle from '@/assets/styles/positron-gl-style.json'
import { useAppStore, type LayerDefinition } from '@/stores/app'

const PREDEFINED_STYLES = {
  voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  positron: positronStyle, //'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
} as const

export function useMapLibre(containerId = 'map', type = 'map') {
  const toast = useToast()
  const map = shallowRef<maplibregl.Map | undefined>(undefined)
  const appStore = useAppStore()
  const { baseMapKey, mapMode, mapReady, mapLayerCollection } =
    storeToRefs(appStore)

  watch(mapMode, (m) => {
    m &&
      map.value?.setProjection({
        type: m,
      })
  })

  watch(baseMapKey, (k) => {
    if (!k) {
      return
    }

    const mapv = map.value!
    const sourcesToPreserve = {}
    const layersToPreserve = []

    mapv.getStyle().layers.forEach((layer) => {
      //   if (layer.id.startsWith('custom-')) {
      //     layersToPreserve.push(layer)
      //   }

      layersToPreserve.push(layer)
    })

    mapv.setStyle(PREDEFINED_STYLES[k])

    mapv.once('styledata', () => {
      // Restore sources
      Object.entries(sourcesToPreserve).forEach(([id, source]) => {
        if (!mapv.getSource(id)) {
          mapv.addSource(id, source)
        }
      })

      // Restore layers
      layersToPreserve.forEach((layer) => {
        if (!mapv.getLayer(layer.id)) {
          if (mapv.getSource(layer.source)) {
            mapv.addLayer(layer)
          }
        }
      })

      mapMode.value = 'map'
    })
  })

  watch(
    mapLayerCollection,
    async (cNew: LayerDefinition[], cOld: LayerDefinition[]) => {
      const mapv = map.value!

      for (let i = 0; i < cNew.length; i++) {
        try {
          const layer = cNew[i]

          const data = await fetch(layer.url)
          const geosource = await data.json()

          console.log(geosource)

          mapv.addSource(layer.name, {
            type: 'geojson',
            data: geosource,
          })

          console.log(mapv.getSource(layer.name))

          mapv.addLayer({
            id: `${layer.name}-fill`,
            type: 'circle',
            source: layer.name,
            paint: {
              'circle-radius': 6,
              'circle-color': '#ffc83c',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#0f172b',
            },
          })

          // TODO: toast not working
          toast.add({
            title: 'New layer on the map!',
            description:
              'The layer xxx has been successfully added to the map.',
            icon: 'lucide-map-plus',
          })
        } catch (e) {
          // ...
        } // TODO: check diff and do not try do add already added
      }
    },
  )

  onMounted(() => {
    map.value = new maplibregl.Map({
      container: containerId,
      style: positronStyle,
      center: [0, 0],
      zoom: 1.5,
    })

    map.value.on('style.load', () => {
      mapReady.value = true
      map.value!.setProjection({ type })
    })

    map.value.addControl(new maplibregl.NavigationControl(), 'top-left')

    map.value.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'metric',
      }),
    )
  })

  return { map }
}
