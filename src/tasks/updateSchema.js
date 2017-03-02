import fs from 'fs'
import path from 'path'
import Schema from '../graph/schema'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const JSON_SCHEMA = path.join(__dirname, '../graph/schema.json')
  const GRAPHQL_SCHEMA = path.join(__dirname, '../graph/schema.graphql')

  try {
    let result = await (graphql(Schema, introspectionQuery))
    console.dir(result, { colors: true, depth: 2 })
    if (result.errors) {
      throw result.errors
    } else {
      fs.writeFileSync(JSON_SCHEMA, JSON.stringify(result, null, 2))
      fs.writeFileSync(GRAPHQL_SCHEMA, printSchema(Schema))
    }
  } catch (err) {
    console.error(JSON.stringify(err, null, 2))
  } finally {
    process.exit()
  }
})()
