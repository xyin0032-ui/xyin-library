import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import router from './router'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAwUuZI8eMDFaP0ebFyIMUAZplbITtjDs0",
  authDomain: "fir-emulator-xintian.firebaseapp.com",
  projectId: "fir-emulator-xintian",
  storageBucket: "fir-emulator-xintian.firebasestorage.app",
  messagingSenderId: "172619550622",
  appId: "1:172619550622:web:cc4fedede0d3e03ae2d08f"
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(router)

app.mount('#app')