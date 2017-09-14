exports.up = function(knex, Promise) {
  return knex.schema.createTable('account_card', table => {
    table.increments('id').primary();
    table.integer('account_id').unsigned().references('id').inTable('account').onDelete('cascade');
    table.integer('card_id').unsigned().references('id').inTable('card').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('account_card');
};
