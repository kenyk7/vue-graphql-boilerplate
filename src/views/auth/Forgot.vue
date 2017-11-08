<template>
  <form @submit.prevent="forgot">
    <div class="field">
      <div class="control">
        <input class="input is-large" v-model="auth.email" type="email" placeholder="Email">
      </div>
    </div>
    <button type="submit" class="button is-primary is-block is-large" style="width:100%">Forgot Password</button>
  </form>
</template>

<script>
import { forgot } from './graph.cool.js'
export default {
  data () {
    return {
      auth: {
        email: null
      }
    }
  },
  methods: {
    forgot () {
      if (!this.auth.email) return
      // Mutation
      const email = this.auth.email
      this.$apollo.mutate({
        mutation: forgot,
        variables: {
          email
        }
      }).then((res) => {
        this.$toast.open({
          message: 'Login Success',
          type: 'is-success'
        })
        this.$router.push({name: 'Home'})
      }).catch((error) => {
        console.error(error)
        this.$toast.open({
          message: 'Error login',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
