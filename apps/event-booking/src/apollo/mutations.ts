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
