import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import maplibregl from 'maplibre-gl'

import positronStyle from '@/assets/styles/positron-gl-style.json'
import { useAppStore } from '@/stores/app'

const PREDEFINED_STYLES = {
  voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  positron: positronStyle, //'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
} as const

export function useMapLibre(containerId = 'map', type = 'map') {
  let map: maplibregl.Map | undefined = undefined
  const appStore = useAppStore()
  const { baseMapKey, mapMode } = storeToRefs(appStore)

  watch(mapMode, (m) => {
    m &&
      map?.setProjection({
        type: m,
      })
  })

  watch(baseMapKey, (k) => {
    k && map?.setStyle(PREDEFINED_STYLES[k])
  })

  onMounted(() => {
    map = new maplibregl.Map({
      container: containerId,
      style: positronStyle,
      center: [0, 0],
      zoom: 1.5,
    })

    map.on('style.load', () => map!.setProjection({ type }))

    map.addControl(new maplibregl.NavigationControl(), 'top-left')

    map.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 80,
        unit: 'metric',
      }),
    )
  })

  return { map }
}
