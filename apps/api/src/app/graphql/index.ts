import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { EventQuery } from "./event/query";

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'The base query',
  fields: {
    events: {
      type: EventQuery,
      description: EventQuery.description,
      resolve: () => { return {} }
    }
  }
})

export const schema = new GraphQLSchema({
  query: Query
})
