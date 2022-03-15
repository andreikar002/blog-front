import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(({ $axios, store, redirect }) => {
  $axios.onRequest((request) => {
    return request
  })

  $axios.onResponse((response) => {
    return response
  })

  $axios.onError((error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      store.getters['auth/isAuth']
    ) {
      store.commit('auth/SET_TOKEN', null)
      redirect('/')
      return error
    }
    return error
  })
})
