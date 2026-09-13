import 'sweetalert2/dist/sweetalert2.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/fontawesome-free/css/all.min.css'
import './assets/css/main.css'
import './styles.css'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/js/main.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
