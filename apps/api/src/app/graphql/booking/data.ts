import { EventService } from "../../services/event-service";

export const getBookings = async (eventId: number) => {
  return EventService.getBookings(eventId);
};
