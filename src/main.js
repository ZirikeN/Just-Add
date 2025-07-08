import './assets/css/main.css'
import './assets/css/theme.css'

import { useTheme } from './assets/theme'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

useTheme()
