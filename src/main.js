import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from "@iconify/vue";
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify';
import { VueQueryPlugin } from "@tanstack/vue-query";
const app = createApp(App)

app.use(createPinia())
app.use(Vue3Toastify, {
    hideProgressBar: true,
    autoClose: 2000,
})
app.use(VueQueryPlugin)

app.use(router)

app.mount('#app')
