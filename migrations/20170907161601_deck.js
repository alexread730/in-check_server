exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck', table => {
    table.increments('id').primary();
    table.text('name').notNull();
    table.text('description').nullable();
    table.boolean('private').notNull();
    table.boolean('active').notNull();
    table.integer('creator_id').unsigned().references('id').inTable('account').onDelete('cascade')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('deck');
};
