import Vue from 'vue'
import apolloClient from '@/apollo'

import {
  postsHome,
  postsHomeSubs
} from '@/graphql'

let postsSubscriptionObserver

const state = {
  hasMore: true,
  perPage: 2,
  posts: [], // {}
  newPosts: [] // {}
}

const getters = {
  hasMore: (state) => state.hasMore,
  perPage: (state) => state.perPage,
  posts: (state) => state.posts,
  newPosts: (state) => state.newPosts
}

const mutations = {
  SET_HAS_MORE (state, status) {
    state.hasMore = status
  },
  SET_POSTS (state, posts) {
    // having an object instead of an array makes the other methods easier
    // since we can use Vue.set() and Vue.delete()
    const object = {}
    posts.map((post) => {
      object[post.id] = post
    })
    state.posts = {...state.posts, ...object}
  },
  ADD_POST (state, post) {
    const object = {}
    object[post.id] = post
    state.newPosts = {...object, ...state.newPosts}
  },
  MERGE_NEW_POSTS (state) {
    state.posts = {...state.newPosts, ...state.posts}
    state.newPosts = []
  },
  UPDATE_POST (state, post) {
    Vue.set(state.posts, post.id, post)
  },
  DELETE_POST (state, post) {
    Vue.delete(state.posts, post.id)
  }
}

const actions = {
  getPosts (context, payload) {
    const perPage = context.state.perPage
    apolloClient.query({
      query: postsHome,
      variables: {
        ...payload,
        perPage
      }
    }).then((result) => {
      const allPosts = result.data.allPosts
      context.commit('SET_POSTS', allPosts)
      if (allPosts.length < perPage) {
        context.commit('SET_HAS_MORE', false)
      }
    })
  },
  subscribeToPosts (context, payload) {
    postsSubscriptionObserver = apolloClient.subscribe({
      query: postsHomeSubs,
      variables: payload
    }).subscribe({
      next (data) {
        // then call your store mutation as usual
        switch (data.Post.mutation) {
          case 'CREATED':
            context.commit('ADD_POST', data.Post.node)
            break
          case 'UPDATED':
            context.commit('UPDATE_POST', data.Post.node)
            break
          case 'DELETED':
            context.commit('DELETE_POST', data.Post.previousValues)
            break
        }
      },
      error (error) {
        console.log(error)
      }
    })
  },
  // You call this action to stop the subscription
  unsubscribeFromPosts (context) {
    if (postsSubscriptionObserver) {
      postsSubscriptionObserver.unsubscribe()
      postsSubscriptionObserver = null
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
