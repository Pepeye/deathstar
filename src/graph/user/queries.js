import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

import { connectionArgs } from 'graphql-relay'
import { connectionFromMongooseQuery } from 'relay-mongodb-connection'
import { GraphQLUser, GraphQLUserConnection } from './type'
// import User from './model'

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
    resolve: (root, args, { user, loaders }) => {
      // console.log(JSON.stringify(loaders, null, 2))
      connectionFromMongooseQuery(loaders.users.all(user), args)
    }
  }
}
