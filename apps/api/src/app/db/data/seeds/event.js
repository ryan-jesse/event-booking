const moment = require('moment');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('event').del()
  await knex('event').insert([
    { name: 'Event 1', capacity: 100, startDateTimeUtc: moment().add(1, 'weeks').utc().toISOString() },
    { name: 'Event 2', capacity: 100, startDateTimeUtc: moment().add(2, 'weeks').utc().toISOString() },
    { name: 'Event 3', capacity: 100, startDateTimeUtc: moment().add(3, 'weeks').utc().toISOString() },
    { name: 'Event 4', capacity: 100, startDateTimeUtc: moment().add(1, 'days').utc().toISOString() }, // Cant cancel bookings
    { name: 'Event 5', capacity: 10, startDateTimeUtc: moment().add(1, 'weeks').utc().toISOString() }, // Should not be able to overload
    { name: 'Event 6', capacity: 10, startDateTimeUtc: moment().add(2, 'weeks').utc().toISOString() }, // Should be able to overload
  ]);
};
