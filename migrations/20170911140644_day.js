exports.up = function(knex, Promise) {
  return knex.schema.createTable('day', table => {
    table.increments('id').primary();
    table.text('day_name').notNull();
    table.integer('day_number').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('day');
};
