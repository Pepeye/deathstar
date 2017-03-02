import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import { connectionDefinitions, globalIdField } from 'graphql-relay'
import { nodeInterface, registerType } from '../node'

// import types
import { GraphQLToken } from '../common/types'

// define type
export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  description: 'This is a User type',
  fields: () => ({
    id: globalIdField('Actor', obj => obj._id),
    firstname: { type: GraphQLString, description: 'First name of user' },
    lastname: { type: GraphQLString, description: 'Last name of user' },
    email: { type: GraphQLString, description: 'Email address of user' },
    password: { type: GraphQLString, description: 'Hashed password of user' },
    active: { type: GraphQLBoolean, description: 'Status of user account' },
    roles: { type: new GraphQLList(GraphQLString), description: 'List of user roles' },
    token: { type: new GraphQLList(GraphQLToken), description: 'List of user auth tokens' }

  }),
  interfaces: [ nodeInterface ]
})

// register type as global node
export default registerType(GraphQLUser)

// export connection type
export const {
  connectionType: GraphQLUserConnection
} = connectionDefinitions({ nodeType: GraphQLUser })
