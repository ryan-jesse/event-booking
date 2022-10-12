import { EventService } from "../../services/event-service";

export const getEvent = (id: number) => {
  return EventService.getEvent(id);
};

export const getEvents = () => {
  return EventService.getEvents();
};

export const canBookingsBeCancelled = (startDateTime: string): boolean => {
  return EventService.canCancelBooking(startDateTime);
}

export const getMaxEventCapacity = (startDateTime: string, capacity: number): number => {
  return EventService.calculateEventCapacity(startDateTime, capacity);
}
