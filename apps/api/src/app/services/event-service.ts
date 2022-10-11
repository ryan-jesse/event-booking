import moment from "moment";

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
    const event = await EventService.getEvent(eventId);
    const eventStart = new Date(event.start);
    const bookings = await EventService.getBookings(eventId);

    if (!EventService.eventHasCapacity(eventStart.toISOString(), event.capacity, bookings.length)) {
      throw new EventReachedCapacityError('Event at capacity.');
    }

    const { id } = await insertBooking(eventId, firstName, lastName);
    return id;
  }

  static eventHasCapacity(startDateTime: string, capacity: number, numberOfBookings: number): boolean {
    const maxCapacity = EventService.calculateEventCapacity(startDateTime, capacity);
    return numberOfBookings < maxCapacity;
  }

  static calculateEventCapacity(startDateTime: string, capacity: number): number {
    const startDate = moment(startDateTime).date();
    const todayPlus10Days = moment().add(10, 'days').date();

    return Math.round(startDate < todayPlus10Days ? capacity : capacity * 1.1);
  }

  static canCancelBooking(startDateTime: string) {
    const startMinus2Days = moment(startDateTime).subtract(48, "hours");
    return moment() < startMinus2Days;
  }

  static getBooking(id: number): Promise<Booking> {
    return getBooking(id);
  }
}

export class EventReachedCapacityError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
