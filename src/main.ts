import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ui from '@nuxt/ui/vue-plugin'

// TODO: lazy loading
import localEn from '@/locales/en.json'
import localFr from '@/locales/fr.json'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    en: localEn,
    fr: localFr,
  },
})

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(ui)

app.mount('#app')
