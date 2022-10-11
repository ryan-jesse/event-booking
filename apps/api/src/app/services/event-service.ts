import { getEvents, getEvent, Event } from "../repositories/event";
import { Booking, getBookingsByEvent } from "../repositories/booking";

export class EventService {
  static getEvents(): Promise<Event[]> {
    return getEvents();
  }

  static getEvent(id: number): Promise<Event> {
    return getEvent(id);
  }

  static getBookings(eventId: number): Promise<Booking[]> {
    return getBookingsByEvent(eventId);
  }
}
