const knex = require('./knex');

module.exports = {
  //get user decks
  getDecks: id => {
    return knex('deck').where('creator_id', id);
  }
}
