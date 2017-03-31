import { GraphQLObjectType } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface, registerType } from '../node'

// import queries for each node
import { GraphQLUser, GraphQLUserQueries } from '../user'

let rootFields = {
  ...GraphQLUserQueries
}

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    me: {
      description: 'current logged in user',
      type: GraphQLUser,
      resolve: (root, args, { viewer, loaders }) => loaders.user.load(viewer, viewer._id)
    },
    ...rootFields
  }),
  interfaces: [ nodeInterface ]
})

export default registerType(viewerType)
