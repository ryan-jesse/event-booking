import { EventService } from "../../services/event-service";

export const getEvent = (id: number) => {
  return EventService.getEvent(id);
};

export const getEvents = () => {
  return EventService.getEvents();
};
