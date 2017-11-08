<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey" v-show="!isForgot" v-if="isLogin">Login</h3>
          <h3 class="title has-text-grey" v-show="!isForgot" v-else>Register</h3>
          <h3 class="title has-text-grey" v-show="isForgot">Forgot password</h3>
          <div class="box">
            <figure class="avatar">
              <img src="https://placeimg.com/128/128/nature">
            </figure>
            <transition name="fade" appear mode="out-in">
              <transition v-if="!isForgot" name="fade" appear mode="out-in">
                <auth-login v-if="isLogin"></auth-login>
                <auth-register v-else></auth-register>
              </transition>
              <auth-forgot v-else></auth-forgot>
            </transition>
          </div>
          <p class="has-text-grey">
            <a href="#" v-if="isLogin" @click.prevent="isLogin = false, isForgot = false">
              Sign Up <span>&nbsp;·&nbsp;</span>
            </a>
            <a href="#" v-else @click.prevent="isLogin = true, isForgot = false">
              Sign In <span>&nbsp;·&nbsp;</span>
            </a>
            <a href="#" v-if="!isForgot" @click.prevent="isForgot = true">Forgot Password</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import authLogin from './auth/Login.vue'
import authRegister from './auth/Register.vue'
import authForgot from './auth/Forgot.vue'
export default {
  components: {
    authLogin,
    authRegister,
    authForgot
  },
  data () {
    return {
      isLogin: true,
      isForgot: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  mounted () {
    const _self = this
    if (this.user) {
      _self.$router.push({name: 'Home'})
    }
  }
}
</script>
<style lang="scss" scoped>
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -85px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
