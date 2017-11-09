<template>
  <div class="card article">
    <button class="button is-danger delete-post" @click="deletePost()">
      <b-icon icon="trash"></b-icon>
    </button>
    <div class="card-content">
      <div class="media">
        <div class="media-center">
          <img :src="'https://placeimg.com/140/140/animals?' + post.sendBy.username" class="author-image" :alt="post.sendBy.username">
        </div>
        <div class="media-content has-text-centered">
          <p class="title is-spaced article-title">{{post.title}}</p>
          <p class="subtitle is-6 article-subtitle">
            <a href="#">@{{post.sendBy.username}}</a>
            <span>{{ post.createdAt | moment("from") }}</span>
          </p>
        </div>
      </div>
      <div class="content article-body">
        {{post.content}}
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import updateFakeUser from '@/helpers/updateFakeUser'
const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`
export default{
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    user () {
      return this.$store.state.userAuth
    }
  },
  methods: {
    deletePost () {
      // Mutation
      this.$apollo.mutate({
        mutation: deletePost,
        variables: {
          id: this.post.id
        }
      }).then((data) => {
        // Result
        this.$toast.open({
          message: 'Delete post',
          type: 'is-success'
        })
        updateFakeUser(this.$apollo, this.user.id)
        // remove local if failed websocket
        this.$store.commit('DELETE_POST', this.post)
      }).catch((error) => {
        // Error
        console.log(error)
        this.$toast.open({
          message: 'Error!',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>

<style scoped>
.delete-post{
  position: absolute;
  right: -16px;
  top: -16px;
}
.author-image {
  position: absolute;
  top: -30px;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  border: 3px solid #ccc;
  border-radius: 50%;
}
.media-center {
  display: block;
  margin-bottom: 1rem;
}
.media-content {
  margin-top: 3rem;
}
.article{
  margin-top: 6rem;
}
.article-title {
  font-size: 2rem;
  font-weight: lighter;
}
.article-subtitle {
  color: #909AA0;
  margin-bottom: 2rem;
}
@media (min-width: 575px) {
  .article-body {
    line-height: 1.4;
    margin: 0 5rem;
  }
}
</style>
