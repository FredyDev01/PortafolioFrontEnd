import 'vue2-animate/dist/vue2-animate.min.css'
import './assets/tailwind.css'
import './assets/fonts.css'
import '@splidejs/vue-splide/css'
import axios from 'axios'
import { createApp } from 'vue'
import VueAxios from 'vue-axios'

import { getTheme } from '@/utils/appearance'
import { verificationToken } from '@/utils/token'

import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://portafolio-web-backend.fly.dev'

getTheme()
verificationToken().then(() => {
  if (store.state.jwt.token) {
    axios.defaults.headers = {
      authorization: store.state.jwt.token,
    }
  }
  createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
})
