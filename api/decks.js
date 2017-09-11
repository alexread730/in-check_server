
const express = require('express');
const router = express.Router();
const deckQueries = require('../db/deck_queries');

const knex = require('../db/knex')

router.get('/:id/decks', (req, res) => {
  deckQueries.getDecks(req.params.id)
    .then(decks => {
      res.json(decks);
    });
});

module.exports = router;
