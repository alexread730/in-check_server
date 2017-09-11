
const express = require('express');
const router = express.Router();
const accountQueries = require('../db/account_queries');
const deckQueries = require('../db/deck_queries');

const knex = require('../db/knex')

router.get('/:id', (req, res) => {
  accountQueries.getOne(req.params.id)
    .then(account => {
      res.json(account);
    });
});

router.get('/:id/decks', (req, res) => {
  deckQueries.getDecks(req.params.id)
    .then(decks => {
      res.json(decks);
    });
});

module.exports = router;
