import { EventService } from "../../services/event-service";

export const getBookings = (eventId: number) => {
  return EventService.getBookings(eventId);
};

export const createBooking = async (eventId: number, firstName: string, lastName: string) => {
  const bookingId = await EventService.createBooking(eventId, firstName, lastName);
  return EventService.getBooking(bookingId);
};

export const cancelBooking = (bookingId: number) => {
  return EventService.cancelBooking(bookingId);
};
