import { EventService } from "../../services/event-service";

export const getEvent = async (id: number) => {
  return EventService.getEvent(id);
};

export const getEvents = async () => {
  return EventService.getEvents();
};
