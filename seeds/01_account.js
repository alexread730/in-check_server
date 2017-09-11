
const account = require('../assets/sample_accounts.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE account RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('account').insert(account);
    });
};
