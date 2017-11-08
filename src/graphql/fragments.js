import gql from 'graphql-tag'

export const fieldsPosts = gql`
  fragment fieldsPosts on Post {
    id
    title
    content
    createdAt
    sendBy{
      id
      username
    }
  }
`
