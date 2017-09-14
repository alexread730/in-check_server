const knex = require('./knex');

module.exports = {
  //get user decks
  getOne: id => {
    return knex('account').where('id', id);
  },
  updateCard: (card, id) => {
    return knex('account_card').where('account_id', id)
      // .update({
      //
      // })
  },
  findUserByEmail: email => {
  return knex('account').where('email', email).first();
  },
  addAccount: account => {
    return knex('account').insert(account, '*')
          .then(ids => {
              return ids[0];
            });
  }
}
