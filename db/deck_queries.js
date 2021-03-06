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
  createDeck: (deck) => {
    return knex('deck').insert(deck, 'id');
  },
  createDeckDay: (deck, day) => {
    return knex('deck_day').insert({
      interval: deck.interval,
      startTime: deck.startTime,
      endTime: deck.endTime,
      deck_id: deck.deck_id,
      day_id: day
    }, 'id')
  },
  manageCategory: name => {
    return knex('category').where('name', name);
  },
  createCategory: name => {
    const category = {name: name}
    return knex('category').insert(category, 'id');
  },
  createDeckCategory: (cat_id, deckId) => {
    let object = {
      category_id: cat_id,
      deck_id: deckId
    }
    return knex('deck_category').insert(object, 'id');
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
    return knex('deck_day').where('deck_id', num)
      .andWhere('day_id', dayNum)
        .update({
          interval: updateData.interval,
          startTime: updateData.startTime,
          endTime: updateData.endTime
        })
  },
  updateDeckInfo: (updateData) => {
    return knex('deck').where('id', updateData.deck_id)
      .update({
        name: updateData.deckName,
        description: updateData.deckDesc
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
  },
  deleteDeckDay: id => {
    return knex('deck_day').where('deck_id', id).del();
  },
  createCard: (card, id) => {
    return knex('card').where('deck_id', id)
      .insert(card)
  },
  deleteCard: (id) => {
    return knex('card').where('id', id).del();
  },
  deleteDeck: id => {
    return knex('deck').where('id', id).del();
  }

}
