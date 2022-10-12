import { GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLBoolean } from 'graphql'

import { ListEventBookings } from "../booking/query";
import { canBookingsBeCancelled, getMaxEventCapacity } from "./data";

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
      resolve: (event) => new Date(event.start).toISOString()
    },
    canCancelBookings: {
      type: GraphQLNonNull(GraphQLBoolean),
      description: 'If bookings can be cancelled',
      resolve: (event) => {
        return canBookingsBeCancelled(new Date(event.start).toISOString());
      }
    },
    maxCapacity: {
      type: GraphQLNonNull(GraphQLInt),
      description: 'The current maximum capacity for the event',
      resolve: (event) => {
        return getMaxEventCapacity(new Date(event.start).toISOString(), event.capacity);
      }
    },
    bookings: {
      ...ListEventBookings
    }
  })
});
