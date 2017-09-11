exports.up = function(knex, Promise) {
  return knex.schema.createTable('category', table => {
    table.increments('id').primary();
    table.text('name').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category');
};
