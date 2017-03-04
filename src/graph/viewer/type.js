import { GraphQLObjectType } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface, registerType } from '../node'

// import queries for each node
import { GraphQLUserQueries } from '../user'

let rootFields = {
  ...GraphQLUserQueries
}

const viewerType = new GraphQLObjectType({
  name: 'viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    ...rootFields
  }),
  interfaces: [ nodeInterface ]
})

export default registerType(viewerType)
