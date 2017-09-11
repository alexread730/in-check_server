const knex = require('./knex');

module.exports = {
  //get user decks
  getOne: id => {
    return knex('account').where('id', id);
  }
}
