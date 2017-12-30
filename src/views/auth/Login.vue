<template>
  <form @submit.prevent="login">
    <div class="field">
      <div class="control">
        <input class="input is-large" v-model.trim="auth.email" type="email" placeholder="Email" required>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input is-large" v-model.trim="auth.password" type="password" placeholder="Password" required>
      </div>
    </div>
    <button type="submit" class="button is-primary is-block is-large" style="width:100%">Login</button>
  </form>
</template>

<script>
import { login } from './graph.cool.js'
import { AUTH_TOKEN_NAME } from '@/consts'
import * as types from '@/store/types'

export default {
  data () {
    return {
      auth: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login () {
      const { auth, $apollo, $toast, $store, $router, $ls } = this
      const redirect = this.$route.query.redirect
      if (!auth.email && !auth.password) return
      // Mutation
      const email = auth.email
      const password = auth.password
      $apollo.mutate({
        mutation: login,
        variables: {
          email,
          password
        }
      }).then((res) => {
        $toast.open({
          message: 'Login Success',
          type: 'is-success'
        })
        $ls.set(AUTH_TOKEN_NAME, res.data.signinUser.token)
        $store.commit(types.SET_AUTH, true)
        if (redirect) {
          $router.push({path: redirect})
        } else {
          $router.push({name: 'Home'})
        }
      }).catch((error) => {
        console.error(error)
        $toast.open({
          message: 'Error login',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
