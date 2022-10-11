import { gql } from "@apollo/client";

import { client } from "./client";

export function getEvents() {
  return client
    .query({
      query: gql`
      query GetEvents {
        events {
          list {
            id,
            name,
            capacity,
            startDateTime
          }
        }
      }
    `,
    })
}

export function getEvent(id: number) {
  return client
    .query({
      query: gql`
      query GetEvent {
        events {
          get(id: ${id}) {
            id,
            name,
            capacity,
            startDateTime,
            bookings {
              id,
              firstName,
              lastName
            },
            canCancelBookings,
            maxCapacity
          }
        }
      }
    `,
    })
}
