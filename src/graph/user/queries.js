import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay'
import { GraphQLUser, GraphQLUserConnection } from './type'
import User from './schema'

export default {
  user: {
    description: 'Find user by id',
    type: GraphQLUser,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, { _id }, { user, loaders }) => loaders.users.load(user, _id)
  },

  users: {
    description: 'a list of users',
    type: GraphQLUserConnection,
    args: connectionArgs,
    resolve: async (root, args, { user, loaders }) => {
      let keys = await User
        .find({})
        .then(docs => docs.map(doc => doc.id))

      return connectionFromPromisedArray(loaders.users.many(user, keys), args)
    }
  }
}
