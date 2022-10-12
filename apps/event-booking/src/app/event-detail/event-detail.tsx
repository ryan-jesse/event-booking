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
  list: Booking[];
  canCancelBookings: boolean;
}

export const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>(new Event());
  const [bookings, setBookings] = useState<BookingListState>({ list: [], canCancelBookings: true });
  const [bookingError, setBookingError] = useState<string>('');

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
      setBookings({ list: bookings, canCancelBookings });
    });
  }

  useEffect(() => {
    loadEvent();
  }, []);

  const onMakeBookingClick = (firstName: string, lastName: string) => {
    setBookingError('');
    createBooking(Number(event.id), firstName, lastName).then(() => {
      loadEvent();
    }).catch((e) => {
      setBookingError(e.message);
    });
  }

  const onCancelBookingClick = (bookingId: number) => {
    cancelBooking(bookingId).then(() => {
      loadEvent();
    });
  }

  return (
    <div>
      <h1>Event Detail</h1>
      <div>
        <span className="event-detail-label">Name</span> { event.name }
      </div>
      <div>
        <span className="event-detail-label">Capacity</span> { event.capacity }
      </div>
      <div>
        <span className="event-detail-label">Start Date Time</span> { event.startDateTime }
      </div>
      {(!event.eventAtCapacity) &&
        <div>
          <h3>Book now</h3>
          <NewBookingForm onMakeBookingClick={ onMakeBookingClick }></NewBookingForm>
        </div>
      }
      {bookingError &&
        <p className="error-message">{bookingError}</p>
      }
      <div>
        <BookingList
          bookings={ bookings.list }
          canCancelBookings={ bookings.canCancelBookings }
          onCancelBookingClick={ onCancelBookingClick }
        ></BookingList>
      </div>
    </div>
  )
}
