import gql from 'graphql-tag'

const updateUserFake = gql`
  mutation updateUser($id: ID!) {
    updateUser(id: $id, dummy: "dummy") {
      id
    }
  }
`

export default function (apollo, userId) {
  // fake mutate for update user auth
  apollo.mutate({
    mutation: updateUserFake,
    variables: {
      id: userId
    }
  })
}
