<template>
  <form @submit.prevent="save()" class="has-text-left">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create post</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
            type="text"
            v-model="post.title"
            placeholder="Write your title"
            required>
          </b-input>
        </b-field>
        <b-field label="Content">
          <b-input
            type="textarea"
            v-model="post.content"
            placeholder="Write your content"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cancel</button>
        <button type="submit" class="button is-primary">Save</button>
      </footer>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag'
const createPost = gql`
  mutation createPost($title: String!, $content: String!, $sendBy: ID!) {
    createPost(title: $title,, content: $content, sendById: $sendBy) {
      id
      content
    }
  }
`
const updateUserFake = gql`
  mutation updateUser($id: ID!) {
    updateUser(id: $id, dummy: "dummy") {
      id
    }
  }
`
export default {
  data () {
    return {
      post: {
        title: 'GraphQL: A query language for your API',
        content: null
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.userAuth
    }
  },
  methods: {
    save () {
      const _self = this
      if (!this.post.content && !this.post.title) return
      // by user
      const content = this.post.content
      const title = this.post.title
      const sendBy = this.user.id
      // reset content
      this.post.content = ''
      this.post.title = ''
      // Mutation
      this.$apollo.mutate({
        mutation: createPost,
        variables: {
          content,
          title,
          sendBy
        }
      }).then((data) => {
        // Result
        this.$toast.open({
          message: 'Send post',
          type: 'is-success'
        })
        setTimeout(() => {
          // fake mutate
          // for update user auth
          _self.$apollo.mutate({
            mutation: updateUserFake,
            variables: {
              id: _self.user.id
            }
          })
        }, 700)
      }).catch((error) => {
        // Error
        console.log(error)
        this.$toast.open({
          message: 'Error!',
          type: 'is-danger'
        })
      })
      this.$parent.close()
    }
  }
}
</script>

<style scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
