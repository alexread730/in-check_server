
const express = require('express');
const router = express.Router();
const accountQueries = require('../db/account_queries');
const deckQueries = require('../db/deck_queries');
const twilio = require('twilio');

const knex = require('../db/knex')

//Get one account
router.get('/:id', (req, res) => {
  accountQueries.getOne(req.params.id)
    .then(account => {
      res.json(account);
    });
});

//get decks for one account
router.get('/:id/decks', (req, res) => {
  deckQueries.getDecks(req.params.id)
    .then(decks => {
      res.json(decks);
    });
});

//get cards for one deck
router.get('/:id/decks/:num', (req, res) => {
  deckQueries.getDeckCards(req.params.id, req.params.num)
    .then(decks => {
      res.json(decks);
    });

});

//get info for a specific deck w/ interval
router.get('/:id/decks/:num/info', (req, res) => {
  deckQueries.getOneDeck(req.params.id, req.params.num)
    .then(decks => {
      res.json(decks);
    });

});

//update deck interval
router.put('/:id/decks/:num', (req, res) => {
  deckQueries.updateInterval(req.params.id, req.params.num, req.body)
    .then(deck => {
      res.json({
        message: 'updated interval!'
      })
    })
});

router.post('/twilio', (req, res) => {
  const twiml =  new twilio.TwimlResponse();
  twiml.message('message');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})



module.exports = router;
