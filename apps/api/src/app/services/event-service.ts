import { getEvents, getEvent, Event } from "../repositories/event";

export class EventService {
  static getEvents(): Promise<Event[]> {
    return getEvents();
  }

  static getEvent(id: number): Promise<Event> {
    return getEvent(id);
  }
}
