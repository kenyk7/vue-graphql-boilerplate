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
    const _self = this
    if (this.userLs) {
      _self.$store.commit('setAuth', true)
    } else {
      _self.$store.commit('setAuth', false)
    }
    _self.$store.dispatch('getPosts', {after: null})
    _self.$store.dispatch('subscribeToPosts')
  },
  methods: {
    getAllData () {
      const _self = this
      const userLs = this.$ls.get('GC_AUTH_USER')
      const payload = {
        userAuth: userLs.id
      }
      _self.$store.dispatch('getUser', payload)
      _self.$store.dispatch('subscribeToUserAuth', payload)
    }
  },
  watch: {
    isAuth (to, from) {
      const _self = this
      if (to) {
        _self.getAllData()
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
