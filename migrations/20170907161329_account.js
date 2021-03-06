exports.up = function(knex, Promise) {
  return knex.schema.createTable('account', table => {
    table.increments('id').primary();
    table.text('firstName').notNull();
    table.text('lastName').notNull();
    table.text('email').notNull();
    table.text('password').notNull();
    table.text('phone').notNull();
    table.integer('deckId').nullable();
    table.text('lastText').nullable();
    table.boolean('termSent').notNull();
    table.integer('resCount').notNull();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('account')
};
