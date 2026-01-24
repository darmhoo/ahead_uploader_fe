import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index.ts'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Vue3Toastify, {
    autoClose: 3000,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
} as ToastContainerOptions)
app.use(router)

app.mount('#app')