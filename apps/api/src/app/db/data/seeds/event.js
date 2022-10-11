const moment = require('moment');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('event').del()
  await knex('event').insert([
    { name: 'Event 1', capacity: 100, start: moment().add(1, 'weeks').utc().toISOString() },
    { name: 'Event 2', capacity: 100, start: moment().add(2, 'weeks').utc().toISOString() },
    { name: 'Event 3', capacity: 100, start: moment().add(3, 'weeks').utc().toISOString() },
  ]);
};
