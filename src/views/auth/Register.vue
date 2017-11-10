<template>
  <form @submit.prevent="createUser">
    <div class="field">
      <div class="control">
        <input class="input is-large" v-model="auth.username" type="text" placeholder="Username">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input is-large" v-model="auth.email" type="email" placeholder="Email">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <input class="input is-large" v-model="auth.password" type="password" placeholder="Password">
      </div>
    </div>
    <div class="field">
      <label class="checkbox">
        <input type="checkbox">
        Remember me
      </label>
    </div>
    <button type="submit" class="button is-primary is-block is-large" style="width:100%">Register / Login</button>
  </form>
</template>

<script>
import { createAndLoginUser } from './graph.cool.js'
export default {
  data () {
    return {
      auth: {
        username: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    createUser () {
      const { auth, $apollo, $ls, $toast, $store, $router } = this
      if (!auth.email && !auth.password) return
      // Mutation
      const email = auth.email
      const getUsername = email.split('@')[0]
      const username = auth.username || getUsername
      const password = auth.password
      $apollo.mutate({
        mutation: createAndLoginUser,
        variables: {
          username,
          email,
          password
        }
      }).then((res) => {
        $ls.set('GC_AUTH_TOKEN', res.data.signinUser.token)
        $ls.set('GC_AUTH_USER', res.data.signinUser.user)
        $toast.open({
          message: 'User create and login success',
          type: 'is-success'
        })
        $store.commit('setAuth', true)
        $router.push({name: 'Home'})
      }).catch((error) => {
        // Error
        console.error(error)
        $toast.open({
          message: 'Error User exists',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
