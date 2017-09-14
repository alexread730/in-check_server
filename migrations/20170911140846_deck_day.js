exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck_day', table => {
    table.increments('id').primary();
    table.text('startTime').notNull();
    table.text('endTime').notNull();
    table.integer('interval').nullable();
    table.integer('deck_id').unsigned().references('id').inTable('deck').onDelete('cascade');
    table.integer('day_id').unsigned().references('id').inTable('day').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('deck_day');
};
