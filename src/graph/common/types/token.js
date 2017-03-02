import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

const tokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    auth: { type: GraphQLString, description: 'Token auth type' },
    token: { type: GraphQLString, description: 'Token value' }
  })
})

export default tokenType
