<template>
  <form @submit.prevent="forgotF">
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
    forgotF () {
      console.log('comming soon')
    },
    forgot () {
      const { auth, $apollo, $toast, $router } = this
      if (!auth.email) return
      // Mutation
      const email = auth.email
      $apollo.mutate({
        mutation: forgot,
        variables: {
          email
        }
      }).then((res) => {
        $toast.open({
          message: 'Forgot Success',
          type: 'is-success'
        })
        $router.push({name: 'Home'})
      }).catch((error) => {
        console.error(error)
        $toast.open({
          message: 'Error forgot',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
