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
    resolve: (root, { _id }, { viewer, loaders }) => loaders.user.load(viewer, _id)
  },

  users: {
    description: 'a list of users',
    type: GraphQLUserConnection,
    args: connectionArgs,
    resolve: async (root, args, { viewer, loaders }) => {
      let keys = await User
        .find({})
        .then(docs => docs.map(doc => doc.id))

      return connectionFromPromisedArray(loaders.user.many(viewer, keys), args)
    }
  }
}
