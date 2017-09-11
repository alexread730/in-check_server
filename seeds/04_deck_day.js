const deck_days = require('../assets/sample_deck_days.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE deck_day RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('deck_day').insert(deck_days);
    });
};
