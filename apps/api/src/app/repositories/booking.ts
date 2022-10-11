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

export const insertBooking = async (eventId: number, firstName: string, lastName: string): Promise<{ id: number }> => {
  const insertResult = await db.insert({ eventId, firstName, lastName})
    .returning('id')
    .into('booking')

  return insertResult[0];
}

export const getBooking = async (id: number): Promise<Booking> => {
  const bookingResult = await db.table<Booking>("booking")
    .where({
      id,
    })
    .select('id', 'eventId', 'firstName', 'lastName');

  return bookingResult[0];
}

export const cancelBooking = async (id: number): Promise<void> => {
  await db.table<Booking>("booking")
    .where({
      id,
    })
    .delete();
}
