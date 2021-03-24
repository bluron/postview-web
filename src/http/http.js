import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('pvToken')
  if (token !== null && config.url.indexOf('login') === -1) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, error => {
  return Promise.resolve(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('username')
    localStorage.removeItem('pvToken')
    router.push({ path: '/login' })
  }
  return Promise.resolve(error)
})

// 封装get方法
export function doGet (api) {
  return new Promise((resolve, reject) => {
    Vue.axios.get(process.env.VUE_APP_BASE_URL + api)
      .then(response => {
        if (response) {
          resolve(response.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装post方法
export function doPost (api, param) {
  return new Promise((resolve, reject) => {
    Vue.axios.post(process.env.VUE_APP_BASE_URL + api, qs.stringify(param))
      .then(response => {
        if (response) {
          resolve(response.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}
