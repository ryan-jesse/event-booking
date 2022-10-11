import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useParams
} from "react-router-dom";

import "./app.module.scss";

export const BookingRow = () => {
  return (
    <tr>
      <td>Test</td>
      <td>Case</td>
      <td><button>Cancel booking</button></td>
    </tr>
  )
}

export const BookingList = () => {
  return (
    <div>
      <h3>Bookings</h3>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
        <BookingRow></BookingRow>
      </table>
    </div>
  )
}

export const EventDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Event Detail ({id})</h1>
      <div>Name:</div>
      <div>Capacity:</div>
      <div>Start Date Time:</div>
      <div>
        <BookingList></BookingList>
      </div>
    </div>
  )
}

export const EventRow = () => {
  return (
    <tr>
      <td>Event 1</td>
      <td>100</td>
      <td>{ new Date().toISOString() }</td>
    </tr>
  )
}

export const EventList = () => {
  return (
    <div>
      <h1>Events</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Capacity</th>
          <th>Start Date Time</th>
        </tr>
        <EventRow></EventRow>
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
              <Route path="/" element={<Navigate to="/events" />} />
              <Route path="/events" element={<EventList></EventList>}/>
              <Route path="/events/:id" element={<EventDetail></EventDetail>}/>
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
