import React, { useEffect, useState } from "react";

import { getEvents } from "../../apollo/queries";
import { EventRow } from "../event-row/event-row";

export class Event {
  constructor(
    public id: number = 0,
    public name: string = '',
    public capacity: number = 0,
    public startDateTime: string = '',
    public eventAtCapacity: boolean | null = null) {}
}

type EventListState = Event[];

export const EventList = () => {
  const [events, setEvents] = useState<EventListState>( [] );

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.data.events.list)
    });
  }, []);

  const eventRows = events.map((event: Event) => {
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
