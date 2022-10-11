/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable("event", tbl => {
    tbl.increments();
    tbl.string("name", 255).notNullable();
    tbl.integer("capacity").notNullable();
    tbl.datetime("start").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("event");
};
