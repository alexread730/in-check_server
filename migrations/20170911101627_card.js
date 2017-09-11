exports.up = function(knex, Promise) {
  return knex.schema.createTable('card', table => {
    table.increments('id').primary();
    table.text('term').notNull();
    table.text('definition').notNull();
    table.text('hint').notNull();
    table.text('image').notNull();
    table.boolean('completed').notNull();
    table.integer('deck_id').unsigned().references('id').inTable('deck').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('card');
};
