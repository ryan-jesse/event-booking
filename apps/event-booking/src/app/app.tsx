import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

import { cancelBooking, createBooking } from "../apollo/mutations";
import { getEvent, getEvents } from "../apollo/queries";
import "./app.module.scss";

interface NewBookingFormProps {
  onMakeBookingClick: (firstName: string, lastName: string) => void
}

export const NewBookingForm = (props: NewBookingFormProps) => {
  const [form, setForm] = useState<{ firstName: string, lastName: string}>({ firstName: '', lastName: ''});

  const updateFormState = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [prop]: event.target.value
      }
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName || !form.lastName) {
      alert('Both first and last name need to be provided');
      return;
    }

    props.onMakeBookingClick(form.firstName, form.lastName);
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div>
          <label>
            First name:
            <input type="text" value={ form.firstName } onChange={ updateFormState('firstName') }/>
          </label>
        </div>
        <div>
          <label>
            Last name:
            <input type="text" value={ form.lastName } onChange={ updateFormState('lastName') }/>
          </label>
        </div>
        <input type="submit" value="Make booking"></input>
      </form>
    </div>
  )
}

interface BookingRowProps {
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

interface BookingListProps {
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

interface Booking {
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
      console.log(response);
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

interface EventRowProps {
  id: number
  name: string;
  capacity: number;
  startDateTime: string;
}

export const EventRow = (props: EventRowProps) => {
  const navigate = useNavigate();

  const handleOnRowClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  }

  return (
    <tr onClick={() => handleOnRowClick(props.id)}>
      <td>{ props.name }</td>
      <td>{ props.capacity }</td>
      <td>{ props.startDateTime }</td>
    </tr>
  )
}

interface Event {
  id: number;
  name: string;
  capacity: number;
  startDateTime: string;
  eventAtCapacity?: boolean;
}

interface EventListState {
  events: Event[]
}

export const EventList = () => {
  const [events, setEvents] = useState<EventListState>({ events: [] });

  useEffect(() => {
    getEvents().then((response) => {
      console.log(response);
      setEvents({ events: response.data.events.list })
    });
  }, []);

  const eventRows = events.events.map((event: Event) => {
    const { id, name, capacity, startDateTime} = event;
    return (
      <EventRow key={ id } id={ id } name={ name } capacity={ capacity } startDateTime={ startDateTime }></EventRow>
    );
  });

  return (
    <div>
      <h1>Events</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Start Date Time</th>
          </tr>
        </thead>
        <tbody>
          { eventRows }
        </tbody>
      </table>
    </div>
  )
}

export const App = () => {
  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>Welcome to event-booking!</h1>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/events">Events</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={ <Navigate to="/events" /> } />
              <Route path="/events" element={ <EventList></EventList> }/>
              <Route path="/events/:id" element={ <EventDetail></EventDetail> }/>
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
