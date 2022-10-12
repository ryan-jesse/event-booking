import React from "react";

import { BookingRow } from "../booking-row/booking-row";
import { Booking } from "../event-detail/event-detail";

export interface BookingListProps {
  bookings: Booking[];
  canCancelBookings: boolean;
  onCancelBookingClick: (bookingId: number) => void
}

export const BookingList = (props: BookingListProps) => {
  const bookingRows = props.bookings.map((booking: Booking) => {
    const { id, firstName, lastName } = booking;

    return (
      <BookingRow
        key={ id } id={ id }
        firstName={ firstName }
        lastName={ lastName }
        canCancelBookings={ props.canCancelBookings }
        onCancelBookingClick={ props.onCancelBookingClick }
      ></BookingRow>
    );
  });

  return (
    <div>
      <h3>Bookings</h3>
      <table>
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        { bookingRows }
        </tbody>
      </table>
    </div>
  )
}
