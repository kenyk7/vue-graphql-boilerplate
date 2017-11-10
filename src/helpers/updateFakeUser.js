import gql from 'graphql-tag'
import apollo from '@/apollo'

const updateUserFake = gql`
  mutation updateUser($id: ID!) {
    updateUser(id: $id, dummy: "dummy") {
      id
    }
  }
`

export default function (userId) {
  // fake mutate for update user auth
  apollo.mutate({
    mutation: updateUserFake,
    variables: {
      id: userId
    }
  })
}
