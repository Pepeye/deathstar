import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay'

export const GraphQLTypes = {}

export function registerType (type) {
  // register type in global object
  GraphQLTypes[type.name] = type
  return type
}

class Viewer {}
let viewer = new Viewer()
// R E L A Y   N O D E

export const { nodeInterface, nodeField } = nodeDefinitions(

  async (globalId, context) => {
    let { type, id } = fromGlobalId(globalId)

    /* return viewr OR load item from dataloaders */
    if (type === 'Viewer') return { type, ...viewer }
    let loader = context.loaders[type.toLowerCase()]
    let item = await loader.load(id)
    return { type, ...item }
  },

  function resolveGraphQLTypeFromObject (obj) {
    return GraphQLTypes[obj.type] || null
  }
)
