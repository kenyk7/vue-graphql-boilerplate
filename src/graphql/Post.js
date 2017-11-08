import gql from 'graphql-tag'

import { fieldsPosts } from './fragments'

export const postsHome = gql`
  query allPosts ($after: String, $perPage: Int!) {
    allPosts(first: $perPage, after: $after, orderBy: createdAt_DESC) {
      ...fieldsPosts
    }
  }
  ${fieldsPosts}
`

export const postsHomeSubs = gql`
  subscription {
    Post {
      mutation
      node {
        ...fieldsPosts
      }
      previousValues {
        id
      }
    }
  }
  ${fieldsPosts}
`
