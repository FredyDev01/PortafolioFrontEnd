import router from '@/router'
import store from '@/store'

import { changeView } from './appearance'

let getToken = null

export function deleteToken() {
  clearInterval(getToken)
  localStorage.removeItem('refreshToken')
  store.commit('setRefreshToken')
  store.commit('setJwt')
  changeView('inicio')
  router.push({ path: 'viewInicio' })
}
export async function proccessToken() {
  try {
    await store.dispatch('generateToken')
    getToken = setInterval(
      () => {
        store.dispatch('generateToken')
      },
      store.state.jwt.expireIn * 1000 - 60000,
    )
  } catch {
    deleteToken()
  }
}
export async function verificationToken() {
  const pathName = window.location.pathname.replace('/', '')
  const refreshToken = localStorage.getItem('refreshToken') || null
  store.commit('setShowView', pathName)
  if (refreshToken) {
    store.commit('setRefreshToken', refreshToken)
    await proccessToken()
  }
}
