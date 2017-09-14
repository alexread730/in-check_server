const knex = require('./knex');

module.exports = {
  getAllDecks: id => {
    return knex('deck_day')
      .join('deck', 'deck_id', 'deck.id')
      .join('day', 'day_id', 'day.id')
      .join('account', 'creator_id', 'account.id');
  },
  //get user decks
  getDecks: id => {
    return knex.select('*', 'category.name as category_name', 'deck.name as deck_name').from('deck').where('creator_id', id)
    .join('deck_category', 'deck_id', 'deck.id')
    .join('category', 'category_id', 'category.id');
  },
  //get one deck with interval info
  getOneDeck: (id, num) => {
    return knex.select('*').from('deck').where('deck.id', num)
    .join('deck_day', 'deck_id', 'deck.id');
  },
  //get cards for a specific deck
  getDeckCards: (id, num) => {
    return knex('card').where('deck_id', num);
  },
  //update a deck's interval
  updateInterval: (id, num, updateData) => {
    return knex('deck_day').where('deck_id', num)
      .update({
        interval: updateData.interval
      })
  }

}
