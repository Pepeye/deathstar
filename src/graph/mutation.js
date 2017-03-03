import { GraphQLObjectType } from 'graphql'

// TODO: import module mutations
import { Mutation as user } from './user'

// const rootFields = Object.assign({}, school, student)
const rootFields = {
  ...user
}

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => (rootFields)
})
