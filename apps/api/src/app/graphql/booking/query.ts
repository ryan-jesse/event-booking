import { GraphQLFieldConfig, GraphQLList } from "graphql";

import { getBookings } from "./data";
import { Booking } from './type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ListEventBookings: GraphQLFieldConfig<any, any, any> = {
  type: GraphQLList(Booking),
  description: 'The list of bookings for an event',
  resolve: (parent) => {
    return getBookings(parent.id);
  }
}
