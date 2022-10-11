import db from '../db';

export interface Event {
  id: number;
  name: string;
  capacity: number;
  start: string
}

export const getEvents = async(): Promise<Event[]> => {
  return await db.table<Event>("event").select('id', 'name', 'capacity', 'start');
}

export const getEvent = async (id: number): Promise<Event> => {
  const eventResult = await db.table<Event>("event")
    .where({
      id,
    })
    .select('id', 'name', 'capacity', 'start');
  return eventResult[0];
}
