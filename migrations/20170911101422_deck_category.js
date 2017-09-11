exports.up = function(knex, Promise) {
  return knex.schema.createTable('deck_category', table => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().references('id').inTable('category').onDelete('cascade');
    table.integer('deck_id').unsigned().references('id').inTable('deck').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('deck_category');
};
