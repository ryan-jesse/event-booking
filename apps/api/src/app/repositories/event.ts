import db from '../db';

export interface Event {
  id: number;
  name: string;
  capacity: number;
  startDateTimeUtc: string
}

export const getEvents = async(): Promise<Event[]> => {
  return await db.table<Event>("event").select('id', 'name', 'capacity', 'startDateTimeUtc');
}

export const getEvent = async (id: number): Promise<Event> => {
  const eventResult = await db.table<Event>("event")
    .where({
      id,
    })
    .select('id', 'name', 'capacity', 'startDateTimeUtc');
  return eventResult[0];
}
