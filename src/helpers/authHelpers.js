import Vue from 'vue'
import jwtDecode from 'jwt-decode'
import store from '@/store'
import * as types from '@/store/types'

import { AUTH_TOKEN_NAME } from '@/consts'

export function getToken () {
  return Vue.ls.get(AUTH_TOKEN_NAME)
}

export function getUserToken () {
  if (!getToken()) return false
  return jwtDecode(getToken())
}

export function isTokenExpired () {
  if (!getToken()) return true
  const token = getUserToken()
  // force expired: test
  // const now = new Date('2020,09,11')
  const now = new Date()
  const expirationDate = new Date(0)
  expirationDate.setUTCSeconds(token.exp)
  return expirationDate < now
}

export function logout () {
  store.commit(types.SET_AUTH, false)
  Vue.ls.remove(AUTH_TOKEN_NAME)
}
