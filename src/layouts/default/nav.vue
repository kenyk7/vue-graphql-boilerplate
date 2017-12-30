<template>
  <div>
    <div class="tabs is-centered is-boxed">
      <ul>
        <router-link tag="li" :to="{name: 'Home'}" exact active-class="is-active">
          <a>
            <span class="icon">
              <i class="fa fa-home"></i>
            </span>
            <span>Home</span>
          </a>
        </router-link>
        <router-link v-if="!isAuth" tag="li" :to="{name: 'Login'}" active-class="is-active">
          <a>
            <span class="icon">
              <i class="fa fa-sign-in"></i>
            </span>
            <span>Login</span>
          </a>
        </router-link>
        <router-link v-else tag="li" :to="{name: 'Profile'}" active-class="is-active">
          <a>
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
            <span>{{user.username}}</span>
          </a>
        </router-link>
        <li v-if="isAuth">
          <a @click.prevent="activeTweetForm = true">
            <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
            <span>New post</span>
          </a>
        </li>
      </ul>
      <b-modal v-if="isAuth" :active.sync="activeTweetForm" has-modal-card>
        <modal-post></modal-post>
      </b-modal>
    </div>
  </div>
</template>

<script>
import modalPost from '@/components/ModalPost.vue'
export default {
  components: {
    modalPost
  },
  data () {
    return {
      activeTweetForm: false
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.isAuth
    },
    user () {
      return this.$store.getters.me
    }
  }
}
</script>
