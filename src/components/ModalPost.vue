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
import updateFakeUser from '@/helpers/updateFakeUser'

const createPost = gql`
  mutation createPost($title: String!, $content: String!, $sendBy: ID!) {
    createPost(title: $title,, content: $content, sendById: $sendBy) {
      id
      content
    }
  }
`

export default {
  data () {
    return {
      post: {
        title: null,
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
      const { post, user, $apollo, $toast } = this
      if (!post.content && !post.title) return
      // by user
      const content = post.content
      const title = post.title
      const sendBy = user.id
      // reset content
      post.content = ''
      post.title = ''
      // Mutation
      $apollo.mutate({
        mutation: createPost,
        variables: {
          content,
          title,
          sendBy
        }
      }).then((data) => {
        // Result
        $toast.open({
          message: 'Send post',
          type: 'is-success'
        })
        updateFakeUser(user.id)
      }).catch((error) => {
        // Error
        console.log(error)
        $toast.open({
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
