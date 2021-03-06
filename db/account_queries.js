const knex = require('./knex');

module.exports = {
  //get user decks
  createNewAccount: account => {
    return knex('account').insert(account, '*').then(Account => {
      return Account[0];
    });
  },
  getOne: id => {
    return knex('account').where('id', id);
  },
  updateCard: (card, id) => {
    return knex('account_card').where('account_id', id)
      .update({
        card_id: card.id
      })
  },
  updateAccount: (id, deckId) => {
    return knex('account').where('account.id', id)
      .update({
        termSent: true,
        deckId: deckId,
        lastText: Date.now()
      })
  },
  findUserByEmail: email => {
  return knex('account').where('email', email).first();
  },
  addAccount: account => {
    return knex('account').insert(account, '*')
          .then(ids => {
              return ids[0];
            });
  },
  findAccountByPhone: phone => {
    return knex('account').where('phone', phone)
      .join('deck', 'deckId', 'deck.id')
      .join('account_card', 'account_id', 'account.id')
      .join('card', 'card_id', 'card.id').first();
  },
  firstResUpdate: phone => {
    return knex('account').where('phone', phone)
      .update({
        resCount: 1,
        termSent: false
      })
  },
  secondResUpdate: (phone) => {
    return knex('account').where('phone', phone)
      .update({
        resCount: 2
      })
  },
  resetResCount: phone => {
    return knex('account').where('phone', phone)
      .update({
        resCount: 0
      })
  }
}
