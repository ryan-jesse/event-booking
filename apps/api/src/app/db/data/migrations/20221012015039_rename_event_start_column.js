/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('event', function (table) {
    table.renameColumn("start", "startDateTimeUtc");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('event', function (table) {
    table.renameColumn("startDateTimeUtc", "start");
  });
};
