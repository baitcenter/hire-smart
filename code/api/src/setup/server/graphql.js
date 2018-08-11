// Imports
import graphqlHTTP from 'express-graphql'

// App Imports
import { API_DOCS } from '../config/env'
import config from '../config/server.json'
import authentication from './authentication'
import schema from '../schema'

// Setup GraphQL
export default function (server) {
  console.info('SETUP - GraphQL..')

  server.use(authentication)

  // API (GraphQL on route `/`)
  server.use(config.graphql.endpoint, graphqlHTTP(request => ({
    schema,
    graphiql: API_DOCS === 'true',
    pretty: config.graphql.pretty,
    context: {
      auth: {
        user: request.user,
        isAuthenticated: request.user && request.user.id > 0
      }
    }
  })))
}
