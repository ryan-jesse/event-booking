import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql'

export const Booking = new GraphQLObjectType({
  name: 'Booking',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The booking id'
    },
    eventId: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The event id which the booking relates to'
    },
    firstName: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The booking contacts first name'
    },
    lastName: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The booking contacts last name'
    }
  })
});
