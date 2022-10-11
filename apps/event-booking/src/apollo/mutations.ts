import { gql } from "@apollo/client";

import { client } from "./client";

export function cancelBooking(bookingId: number) {
  return client
    .mutate({
      mutation: gql`
      mutation {
        booking {
          cancel(input: { id: ${bookingId} }) {
            id
          }
        }
      }
    `,
    })
}

export function createBooking(eventId: number, firstName: string, lastName: string) {
  return client
    .mutate({
      mutation: gql`
      mutation {
        booking {
          create(input: { eventId: ${eventId}, firstName: "${firstName}", lastName: "${lastName}" }) {
            id
          }
        }
      }
    `,
    })
}
