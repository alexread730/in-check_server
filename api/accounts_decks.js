
const express = require('express');
const router = express.Router();
const accountQueries = require('../db/account_queries');
const deckQueries = require('../db/deck_queries');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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

function markCard(account, res, completed) {
  let status = completed ? 'completed!' : 'incomplete';

  accountQueries.secondResUpdate(account.phone)
    .then(response => {
      deckQueries.updateCard(account.card_id, completed)
        const twiml = new MessagingResponse();
        twiml.message(`Card marked as ${status}!`);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    })
    .then(response => {
      return accountQueries.resetResCount(account.phone);
    })
}

router.post('/twilio', (req, res) => {
  //get account info from sender #
  let sender = req.body.From.substring(2)
  accountQueries.findAccountByPhone(sender)
    .then(account => {
      console.log('account: ', account, account.resCount);
      if (account.resCount == 0) {
        accountQueries.firstResUpdate(account.phone)
          .then(response => {
              const twiml = new MessagingResponse();
              twiml.message(`Definition: ${account.definition}. Respond with 'y' if your response was correct and 'n' if your response was incorrect!`);
              res.writeHead(200, {'Content-Type': 'text/xml'});
              res.end(twiml.toString());
          })
      } else if (account.resCount == 1) {
          if (req.body.Body.toLowerCase() == 'y') {
            //mark card complete
            markCard(account, res, true);
          } else if (req.body.Body.toLowerCase() == 'n') {
            //mark card incomplete
            markCard(account, res, false);
          } else {
            const twiml = new MessagingResponse();
            twiml.message(`Please enter 'y' for correct, or 'n' for incorrect.`);
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
          }
      }
    })
})



module.exports = router;
