exports.up = function(knex, Promise) {
  return knex.schema.createTable('interval', table => {
    table.increments('id').primary();
    table.time('startTime').notNull();
    table.time('endTime').notNull();
    table.integer('interval').notNull();
    table.text('days').notNull();
    table.integer('account_id').unsigned().references('id').inTable('account').onDelete('cascade');
    table.integer('deck_id').unsigned().references('id').inTable('deck').onDelete('cascade')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('interval')
};
