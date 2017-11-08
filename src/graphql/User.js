import gql from 'graphql-tag'

const fAuthUser = gql`
  fragment fAuthUser on User {
    id
    username
    email
    _postsMeta{
      count
    }
  }
`
export const profileInfo = gql`
  query User ($userAuth: ID!) {
    User(id: $userAuth){
      ...fAuthUser
    }
  }
  ${fAuthUser}
`
export const userAuthSubs = gql`
  subscription ($userAuth: ID!) {
    User (filter: {mutation_in: [UPDATED], node: {id: $userAuth}}) {
      mutation
      node {
        ...fAuthUser
      }
      previousValues {
        id
      }
    }
  }
  ${fAuthUser}
`
