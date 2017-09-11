const deck_categories = require('../assets/sapmle_deck_categories.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE deck_category RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('deck_category').insert(deck_categories);
    });
};
