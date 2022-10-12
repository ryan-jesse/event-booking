import React from "react";

export interface BookingRowProps {
  id: number;
  firstName: string;
  lastName: string;
  canCancelBookings: boolean;
  onCancelBookingClick: (bookingId: number) => void
}

export const BookingRow = (props: BookingRowProps) => {
  return (
    <tr>
      <td>{ props.firstName }</td>
      <td>{ props.lastName }</td>
      <td>
        <button
          disabled={ !props.canCancelBookings }
          onClick={ () => props.onCancelBookingClick(props.id) }
        >
          Cancel booking
        </button>
      </td>
    </tr>
  )
}
