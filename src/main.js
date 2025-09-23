import './assets/css/main.css'
import './assets/css/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia()
const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(pinia)
app.use(router)

app.mount('#app')