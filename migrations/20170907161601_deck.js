exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck', table => {
    table.increments('id').primary();
    table.text('category').notNull();
    table.boolean('priavate').notNull();
    table.text('score').notNull();
    table.boolean('active').notNull();
    table.text('description');
    table.integer('creator_id').unsigned().references('id').inTable('account').onDelete('cascade')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('deck');
};
