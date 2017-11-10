<template>
  <main>
    <transition name="fade" appear mode="out-in">
      <tpl-blank v-if="isLogin"></tpl-blank>
      <tpl-default v-else></tpl-default>
    </transition>
  </main>
</template>

<script>
import tplDefault from './layouts/default.vue'
import tplBlank from './layouts/blank.vue'
export default {
  components: {
    tplDefault,
    tplBlank
  },
  data () {
    return {
      userLs: this.$ls.get('GC_AUTH_USER')
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'Login'
    },
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  created () {
    const {userLs, $store} = this
    if (userLs) {
      $store.commit('setAuth', true)
    } else {
      $store.commit('setAuth', false)
    }
    $store.dispatch('getPosts', {after: null})
    $store.dispatch('subscribeToPosts')
  },
  methods: {
    getAllData () {
      const { $ls, $store } = this
      const userLs = $ls.get('GC_AUTH_USER')
      const payload = {
        userAuth: userLs.id
      }
      $store.dispatch('getUser', payload)
      $store.dispatch('subscribeToUserAuth', payload)
    }
  },
  watch: {
    isAuth (to, from) {
      const { getAllData } = this
      if (to) {
        getAllData()
      }
    }
  }
}
</script>

<style>
.main{
  background: #F2F6FA;
}
.section{
  padding: 30px 15px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: scale(0.9);
}
</style>
