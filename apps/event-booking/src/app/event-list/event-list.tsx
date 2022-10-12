import React, {useEffect, useState} from "react";

import { getEvents } from "../../apollo/queries";
import { EventRow } from "../event-row/event-row";

export interface Event {
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
