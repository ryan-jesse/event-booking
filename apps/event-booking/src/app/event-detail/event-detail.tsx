import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getEvent } from "../../apollo/queries";
import { cancelBooking, createBooking } from "../../apollo/mutations";
import { BookingList } from "../booking-list/booking-list";
import { Event } from "../event-list/event-list";
import { NewBookingForm } from "../new-booking-form/new-booking-form";

export interface Booking {
  id: number;
  firstName: string;
  lastName: string;
}

interface BookingListState {
  bookings: Booking[];
  canCancelBookings: boolean;
}

export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [bookings, setBookings] = useState<BookingListState>({ bookings: [], canCancelBookings: true });

  const loadEvent = () => {
    getEvent(Number(id)).then((response) => {
      const { id, name, capacity, startDateTime, canCancelBookings, maxCapacity, bookings } = response.data.events.get;
      const eventAtCapacity = bookings.length >= maxCapacity;

      setEvent({
        id,
        name,
        capacity,
        startDateTime,
        eventAtCapacity
      });
      setBookings({ bookings, canCancelBookings });
    });
  }

  useEffect(() => {
    loadEvent();
  }, []);

  const onMakeBookingClick = (firstName: string, lastName: string) => {
    if (event?.id) {
      createBooking(Number(event.id), firstName, lastName).then(() => {
        loadEvent();
      });
    }
  }

  const onCancelBookingClick = (bookingId: number) => {
    cancelBooking(bookingId).then(() => {
      loadEvent();
    });
  }

  return (
    <div>
      <h1>Event Detail ({ id })</h1>
      <div>Name: { event?.name }</div>
      <div>Capacity: { event?.capacity }</div>
      <div>Start Date Time: { event?.startDateTime }</div>
      {(!event?.eventAtCapacity || true) &&
        <div>
          <h3>Book now</h3>
          <NewBookingForm onMakeBookingClick={ onMakeBookingClick }></NewBookingForm>
        </div>
      }
      <div>
        <BookingList
          bookings={ bookings.bookings }
          canCancelBookings={ bookings.canCancelBookings }
          onCancelBookingClick={ onCancelBookingClick }
        ></BookingList>
      </div>
    </div>
  )
}
