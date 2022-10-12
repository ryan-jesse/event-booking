import moment from "moment/moment";
import { EventService } from "./event-service";

jest.mock('../repositories/booking', () => {});
jest.mock('../repositories/event', () => {});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('EventService', () => {
  describe('eventHasCapacity', () => {
    it('should allow bookings if capacity is less than max capacity', () => {
      // Arrange
      const startDateTime = moment().add(9, 'days');
      const capacity = 100;
      const numberOfBookings = 99;

      // Act
      const result = EventService.eventHasCapacity(String(startDateTime.toISOString()), capacity, numberOfBookings);

      // Assert
      expect(result).toEqual(true)
    });

    it('should not allow any overbooking if start date is within 10 days', () => {
      // Arrange
      const startDateTime = moment().add(9, 'days');
      const capacity = 100;
      const numberOfBookings = 100;

      // Act
      const result = EventService.eventHasCapacity(String(startDateTime.toISOString()), capacity, numberOfBookings);

      // Assert
      expect(result).toEqual(false)
    });

    it('should allow overbooking if start date is equal to 10 days', () => {
      // Arrange
      const startDateTime = moment().add(10, 'days');
      const capacity = 100;
      const numberOfBookings = 100;

      // Act
      const result = EventService.eventHasCapacity(String(startDateTime.toISOString()), capacity, numberOfBookings);

      // Assert
      expect(result).toEqual(true)
    });

    it('should allow overbooking if start date is greater than 10 days', () => {
      // Arrange
      const startDateTime = moment().add(11, 'days');
      const capacity = 100;
      const numberOfBookings = 100;

      // Act
      const result = EventService.eventHasCapacity(String(startDateTime.toISOString()), capacity, numberOfBookings);

      // Assert
      expect(result).toEqual(true)
    });

    it('should not allow overbooking if overbooking limit is reached', () => {
      // Arrange
      const startDateTime = moment().add(11, 'days');
      const capacity = 100;
      const numberOfBookings = 110;

      // Act
      const result = EventService.eventHasCapacity(String(startDateTime.toISOString()), capacity, numberOfBookings);

      // Assert
      expect(result).toEqual(false)
    });
  });

  describe('canCancelBooking', () => {
    it('should allow for bookings to be cancelled if start time greater is than 48 hours from now', () => {
      // Arrange
      const startDateTime = moment().add(49, 'hours');

      // Act
      const result = EventService.canCancelBooking(String(startDateTime.toISOString()));

      // Assert
      expect(result).toEqual(true);
    });

    it('should not allow for bookings to be cancelled if start time is 48 hours from now', () => {
      // Arrange
      const startDateTime = moment().add(48, 'hours');

      // Act
      const result = EventService.canCancelBooking(String(startDateTime.toISOString()));

      // Assert
      expect(result).toEqual(false);
    });

    it('should not allow for bookings to be cancelled if start time is less than 48 hours from now', () => {
      // Arrange
      const startDateTime = moment().add(48, 'hours');

      // Act
      const result = EventService.canCancelBooking(String(startDateTime.toISOString()));

      // Assert
      expect(result).toEqual(false);
    });
  });
});
