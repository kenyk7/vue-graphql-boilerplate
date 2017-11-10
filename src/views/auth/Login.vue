<template>
  <form @submit.prevent="login">
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
    <button type="submit" class="button is-primary is-block is-large" style="width:100%">Login</button>
  </form>
</template>

<script>
import { login } from './graph.cool.js'
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
      const { auth, $apollo, $ls, $toast, $store, $router } = this
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
        $ls.set('GC_AUTH_TOKEN', res.data.signinUser.token)
        $ls.set('GC_AUTH_USER', res.data.signinUser.user)
        $toast.open({
          message: 'Login Success',
          type: 'is-success'
        })
        $store.commit('setAuth', true)
        $router.push({name: 'Home'})
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
