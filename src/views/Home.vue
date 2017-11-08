<template>
  <section class="section main">
    <div class="container">
      <div class="column is-8 is-offset-2">
        <p v-if="hasNews > 0">
          <button class="button is-primary is-fullwidth" @click="mergeNewPosts()">
            See {{hasNews}} new quotes
          </button>
        </p>
        <app-post v-for="item in posts" :post="item" :key="item.id"></app-post>
        <br>
        <p class="has-text-centered">
          <button v-if="hasMore" class="button is-primary" @click="loadMore()">Ver más</button>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import appPost from './post/Post.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    appPost
  },
  computed: {
    ...mapGetters(['user', 'posts', 'newPosts', 'hasMore']),
    hasNews () {
      return Object.keys(this.newPosts).length
    }
  },
  mounted () {
    const _self = this
    window.onscroll = function (e) {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
        _self.loadMore()
      }
    }
  },
  methods: {
    mergeNewPosts () {
      this.$store.commit('MERGE_NEW_POSTS')
    },
    loadMore () {
      if (!this.hasMore) return
      const keys = Object.keys(this.posts)
      const payload = {
        after: keys[keys.length - 1]
      }
      console.log('load more')
      this.$store.dispatch('getPosts', payload)
    }
  }
}
</script>

<style scoped>
div.column.is-8:first-child {
  padding-top: 0;
  margin-top: 0;
}
</style>
