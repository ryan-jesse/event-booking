import db from '../db';

export interface Booking {
  id: number;
  eventId: number;
  firstName: string;
  lastName: string
}

export const getBookingsByEvent = async(eventId: number): Promise<Booking[]> => {
  return await db.table<Booking>("booking")
    .where({
      eventId,
    })
    .select('id', 'eventId', 'firstName', 'lastName');
}

export const insertBooking = async(eventId: number, firstName: string, lastName: string): Promise<Booking[]> => {
  return await db.table<Booking>("booking").insert[{ eventId, firstName, lastName}];
}
