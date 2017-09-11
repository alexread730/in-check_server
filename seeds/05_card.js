const cards = require('../assets/sample_cards.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE card RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('card').insert(cards);
    });
};
