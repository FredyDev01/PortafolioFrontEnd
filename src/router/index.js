import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Portfolio/ViewPortfolio.vue'),
    meta: { title: 'Portafolio' },
    children: [
      {
        path: '/',
        name: 'viewHome',
        component: () => import('@/views/Portfolio/ViewHome.vue'),
      },
      {
        path: 'capacidades',
        name: 'viewCapabilities',
        component: () => import('@/views/Portfolio/ViewCapabilities.vue'),
      },
      {
        path: 'proyectos',
        name: 'viewProject',
        component: () => import('@/views/Portfolio/ViewProject.vue'),
      },
      {
        path: 'contacto',
        name: 'viewContact',
        component: () => import('@/views/Portfolio/ViewContact.vue'),
      },
      {
        path: ':pathMatch(.*)',
        redirect: '/',
      },
    ],
  },
  {
    path: '/loguin',
    name: 'viewLogin',
    component: () => import('@/views/Loguin/ViewLogin.vue'),
    meta: { title: 'Login', routeProtected: true },
  },
  {
    path: '/panel',
    name: 'viewPanel',
    component: () => import('@/views/Panel/ViewPanel.vue'),
    meta: { title: 'Panel', routeProtected: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const isRouteProtected = to.matched.some((item) => item.meta.routeProtected)
  document.title = 'FredyDev01 - ' + to.meta.title
  if (isRouteProtected) {
    if (to.name === 'viewLogin') {
      if (store.state.jwt.token) {
        next('/')
      } else {
        next()
      }
    } else if (to.name === 'viewPanel') {
      if (!store.state.jwt.token) {
        next('/')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
