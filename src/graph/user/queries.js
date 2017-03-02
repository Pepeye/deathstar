import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay'

import { GraphQLUser, GraphQLUserConnection } from './schema'
import User from './model'

export default {
  user: {
    description: 'Find user by id',
    type: GraphQLUser,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, { _id }, { loaders }) => loaders.User.load(_id)
  },

  users: {
    description: 'a list of movies',
    type: GraphQLUserConnection,
    args: connectionArgs,
    resolve: (root, args) => connectionFromPromisedArray(User.find({}), args)
  }
}
