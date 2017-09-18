const knex = require('./knex');

module.exports = {
  getAllDecks: id => {
    return knex.select('*', 'deck.id as deck_id', 'deck_day.id as id').from('deck_day')
      .join('deck', 'deck_id', 'deck.id')
      .join('day', 'day_id', 'day.id')
      .join('account', 'creator_id', 'account.id')
      .join('account_card', 'account.id', 'account_id')
      .join('card', 'card_id', 'card.id');;
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
  updateDeck: (id, num, updateData, dayNum) => {
    console.log(dayNum);

    return knex('deck_day').where('deck_id', num)
    // return knex('deck_day').where('deck_id', num)
    //   .update({
    //     interval: updateData.interval
    //   })
  },
  updateCard: (id, completed) => {
    console.log(typeof completed);
    return knex('card').where('id', id)
      .update({
        completed: completed
      })
  },
  resetDeck: id => {
    return knex('card').where('deck_id', id)
      .update({
        completed: false
      })
  }

}
