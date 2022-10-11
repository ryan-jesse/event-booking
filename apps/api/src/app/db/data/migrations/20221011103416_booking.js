/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema.createTable("booking", tbl => {
    tbl.increments();
    tbl.integer("eventId", 255)
      .notNullable()
      .references("id")
      .inTable("event")
      .onDelete("CASCADE");
    tbl.string("firstName", 255).notNullable();
    tbl.string("lastName", 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("booking");
};
