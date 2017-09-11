const decks = require('../assets/sample_decks.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE deck RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('deck').insert(decks);
    });
};
