import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "en",
  messages: {
    en: {
      message: {
        hello: "hello world",
      },
    },
    fr: {
      message: {
        hello: "bonjour",
      },
    },
  },
});

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount("#app");
