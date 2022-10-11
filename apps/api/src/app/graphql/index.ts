import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { EventQuery } from "./event/query";
import { BookingMutation } from "./booking/mutation";

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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The base mutation',
  fields: {
    booking: {
      type: BookingMutation,
      description: BookingMutation.description,
      resolve: () => { return {} }
    }
  }
})

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
