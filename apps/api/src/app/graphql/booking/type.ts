import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType } from 'graphql'

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

export const BookingInput = new GraphQLInputObjectType({
  name: 'BookingInput',
  description: 'Booking create type',
  fields: {
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
    },
  }
})

export const CancelBookingInput = new GraphQLInputObjectType({
  name: 'CancelBookingInput',
  description: 'Booking delete type',
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'The booking id to cancel'
    }
  }
})
