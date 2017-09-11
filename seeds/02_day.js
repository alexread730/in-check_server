const days = require('../assets/sample_days.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE day RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('day').insert(days);
    });
};
