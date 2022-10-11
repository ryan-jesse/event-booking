import { GraphQLFieldConfig, GraphQLObjectType } from "graphql";

import { cancelBooking, createBooking } from "./data";
import { Booking, BookingInput, CancelBookingInput } from './type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateBooking: GraphQLFieldConfig<any, any, any> = {
  type: Booking,
  description: Booking.description,
  args: {
    input: {
      type: BookingInput,
      description: BookingInput.description
    }
  },
  resolve: async (parent, args) => {
    const { eventId, firstName, lastName } = args.input
    return await createBooking(eventId, firstName, lastName);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CancelBooking: GraphQLFieldConfig<any, any, any> = {
  type: Booking,
  description: Booking.description,
  args: {
    input: {
      type: CancelBookingInput,
      description: CancelBookingInput.description
    }
  },
  resolve: async (parent, args) => {
    const { id } = args.input
    await cancelBooking(id);
    return { id };
  }
};

export const BookingMutation = new GraphQLObjectType({
  name: 'BookingMutation',
  description: 'The booking base mutation',
  fields: {
    create: CreateBooking,
    cancel: CancelBooking
  }
})
