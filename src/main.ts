import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

const vuetify = createVuetify();
const pinia = createPinia();

const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.mount("#app");
