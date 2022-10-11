import { getEvents, getEvent, Event } from "../repositories/event";
import { Booking, getBooking, getBookingsByEvent, insertBooking } from "../repositories/booking";

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

  static async createBooking(eventId: number, firstName: string, lastName: string): Promise<number> {
    const { id } = await insertBooking(eventId, firstName, lastName);
    return id;
  }

  static getBooking(id: number): Promise<Booking> {
    return getBooking(id);
  }
}
