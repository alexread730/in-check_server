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
  createDeckDay: (deck, day) => {
    console.log('create');
    return knex('deck_day').insert({
      interval: deck.interval,
      startTime: deck.startTime,
      endTime: deck.endTime,
      deck_id: deck.deck_id,
      day_id: day
    })
  },
  getOneDeckDay: (id, num) => {
    return knex.select('*').from('deck_day').where('deck_id', id)
      .andWhere('day_id', num);
  },
  //get cards for a specific deck
  getDeckCards: (id, num) => {
    return knex('card').where('deck_id', num);
  },
  //update a deck's interval
  updateDeck: (id, num, updateData, dayNum) => {
    console.log('update');
    return knex('deck_day').where('deck_id', num)
      .andWhere('day_id', dayNum)
        .update({
          interval: updateData.interval,
          startTime: updateData.startTime,
          endTime: updateData.endTime
        })
  },
  updateCard: (id, completed) => {
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
