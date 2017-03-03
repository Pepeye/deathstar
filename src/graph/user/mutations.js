
import {
  GraphQLNonNull
} from 'graphql'

import { GraphQLUser, GraphQLUserInput } from './type'
import User from './schema'

export default {
  signup: {
    description: 'sign up as new user',
    type: GraphQLUser,
    args: {
      data: { type: new GraphQLNonNull(GraphQLUserInput) }
    },
    resolve: (root, { data }) => {
      const user = new User(data)
      return user.save()
        .then(() => {
          return user.generateAuthToken()
            .then(token => {
              return { user, token }
            })
        })
    }
  }
}
