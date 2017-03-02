import { GraphQLObjectType } from 'graphql'
import { nodeField } from './node'
import { GraphQLViewer } from './viewer'

// V I E W E R
class Viewer {}

export default new GraphQLObjectType({
  name: 'Query',
  // fields: () => (rootFields)
  fields: () => ({
    viewer: {
      type: GraphQLViewer,
      resolve: () => new Viewer()
    },
    node: nodeField
  })
})
