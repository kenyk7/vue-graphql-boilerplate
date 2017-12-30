import Vue from 'vue'
import Vuex from 'vuex'
import apolloClient from '@/apollo'

import post from './modules/post'

import {
  profileInfo,
  userAuthSubs
} from '@/graphql'

import * as types from './types'

Vue.use(Vuex)
const DEBUG = process.env.NODE_ENV === 'development'

const state = {
  isAuth: false,
  me: null // {}
}

const getters = {
  isAuth: state => state.isAuth,
  me: state => state.me
}

// use inmutable for merge oldVal with newVal
const mutations = {
  [types.SET_AUTH] (state, payload) {
    // inmutable: example use vue set in data primitive
    Vue.set(state, 'isAuth', payload)
  },
  [types.SET_USER] (state, payload) {
    // inmutable: example use spread operator in data not primitive (objects, arrays)
    state.me = {...payload}
  }
}

const actions = {
  getUser (context, payload) {
    apolloClient.query({query: profileInfo, variables: payload}).then((result) => {
      context.commit(types.SET_USER, result.data.User)
    })
  },
  subscribeToUserAuth (context, payload) {
    apolloClient.subscribe({
      query: userAuthSubs,
      variables: payload
    }).subscribe({
      next (data) {
        // mutation will say the type of GraphQL mutation `CREATED`, `UPDATED` or `DELETED`
        console.log(data.User.mutation)
        // node is the actual data of the result of the GraphQL mutation
        console.log(data.User)
        // then call your store mutation as usual
        switch (data.User.mutation) {
          case 'UPDATED':
            context.commit(types.SET_USER, data.User.node)
            break
        }
      },
      error (error) {
        console.log(error)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    post
  },
  strict: DEBUG
})
