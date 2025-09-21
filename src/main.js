import './assets/css/main.css'
import './assets/css/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)


app.mount('#app')

setTimeout(() => {
    import('./assets/theme').then((module) => {
        module.useTheme()
    })
}, 1)
