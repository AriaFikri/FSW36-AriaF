/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('place', (table) => {
    table.bigIncrements('id').primary();
    table.string('name',255).notNullable();
    table.string("city", 255).notNullable();
    table.string("address", 255).notNullable();
    table.unique(['name','city','address'])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('place')
};
