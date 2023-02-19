import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@splidejs/vue-splide/css'
import './assets/tailwind.css'
import './assets/fonts.css'
require('vue2-animate/dist/vue2-animate.min.css')


axios.defaults.baseURL = 'https://portafolio-web-backend.fly.dev' 
axios.defaults.withCredentials = true


store.dispatch('GetTheme')
store.dispatch('VrfData').then(()=>{    
    axios.defaults.headers = {'auth-token': store.state.Jwt}
    createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')
})