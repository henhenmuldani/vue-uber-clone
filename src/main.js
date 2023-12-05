import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_VUE_APP_API_URL

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
