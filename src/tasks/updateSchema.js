import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import Schema from '../graph/schema'
import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const JSON_SCHEMA = path.join(__dirname, '../graph/schema.json')
  const GRAPHQL_SCHEMA = path.join(__dirname, '../graph/schema.graphql')

  console.log(chalk.yellow('[schema] Started creating JSON Scehma'))

  try {
    let result = await (graphql(Schema, introspectionQuery))
    if (result.errors) {
      throw result.errors
    } else {
      fs.writeFileSync(JSON_SCHEMA, JSON.stringify(result, null, 2))
      fs.writeFileSync(GRAPHQL_SCHEMA, printSchema(Schema))
      console.log(chalk.blue('[schema] Finished creating JSON Scehma'))
    }
  } catch (err) {
    console.error(
      chalk.red('[error] Error introspecting schema: '),
      JSON.stringify(err, null, 2)
    )
  } finally {
    process.exit()
  }
})()
