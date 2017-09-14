const account_cards = require('../assets/sample_account_cards.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE account_card RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('account_card').insert(account_cards);
    });
};
