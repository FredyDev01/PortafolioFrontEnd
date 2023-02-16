import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'


const routes = [  
  {
    path: '/',
    component: ()=> import('../views/Portafolio/index.vue'),
    children: [
      {
        path: '/',
        name: 'Prt_Inicio',
        component: () => import('../views/Portafolio/InicioView.vue')
      },
      {
        path: 'Capacidades',
        name: 'Prt_Capacidades',
        component: () => import('../views/Portafolio/CapacidadesView.vue')
      },
      {
        path: 'Proyectos',
        name: 'Prt_Proyectos',
        component: () => import('../views/Portafolio/ProyectosView.vue')
      },
      {
        path: 'Contacto',
        name: 'Prt_Contacto',
        component: () => import('../views/Portafolio/ContactoView.vue')
      },

      {    
        path: ':pathMatch(.*)',
        redirect: '/'
      }
    ]
  },
  {
    path: '/Loguin',
    name: 'Pnl_Loguin',
    component: () => import('../views/Loguin/index.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/Panel',
    name: 'Pnl_Admin',
    component: () => import('../views/Panel/index.vue'),    
    meta: {rutaProtegida: true}
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async(to, from, next)=>{  
  const VerfRutaProtegia = to.matched.some(item => item.meta.rutaProtegida)  
  if(VerfRutaProtegia){    
    if(to.name == 'Pnl_Loguin'){
      if(store.state.Jwt.Token) next('/')
      else next()      
    }else if(to.name == 'Pnl_Admin'){
      if(!store.state.Jwt.Token) next('/')
      else next()      
    }
  }else next()  
})


export default router