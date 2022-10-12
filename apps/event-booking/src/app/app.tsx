import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import { EventList } from "./event-list/event-list";
import { EventDetail } from "./event-detail/event-detail";

export const App = () => {
  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>Welcome to event-booking!</h1>
        <div className="content-wrapper">
          <Router>
            <div className="content">
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
      </div>
    </>
  );
};

export default App;
