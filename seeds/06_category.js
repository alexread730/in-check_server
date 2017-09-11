const categories = require('../assets/sample_categories.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE category RESTART IDENTITY CASCADE;')
    .then(() => {
      // Inserts seed entries
      return knex('category').insert(categories);
    });
};
