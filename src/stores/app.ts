import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const baseMapKey = ref<string | undefined>('positron')

  return { baseMapKey }
})
