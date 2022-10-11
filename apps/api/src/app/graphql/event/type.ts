import { GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql'
import { ListEventBookings } from "../booking/query";

export const Event = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The event id'
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The event name'
    },
    capacity: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'The event capacity'
    },
    startDateTime: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The event start date time',
      resolve: (event) => event.start
    },
    bookings: {
      ...ListEventBookings
    }
  })
});
