
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

//create new deck
router.post('/:id/decks', (req, res, next) => {
  let deck = {
    name: req.body.name,
    description: req.body.description,
    private: req.body.private,
    active: req.body.active,
    creator_id: req.body.creator_id
  }

  let deck_day = {
    interval: 20,
    startTime: 9,
    endTime: 17,
    day_id: Number(req.body.day_id)
  }

  //creates category_deck insert on new deck creation
  deckQueries.createDeck(deck)
    .then(id => {
      //see if category exists
      deckQueries.manageCategory(req.body.category)
        .then(category => {
          // console.log(category);
          if (category) {
            console.log(req.body.category);
            //if no category, create a new one
            deckQueries.createCategory(req.body.category)
              .then(category_id => {
                //insert to deck_category
                deckQueries.createDeckCategory(Number(category_id), Number(id))
                  .then(response => {
                    deck_day['deck_id'] = Number(id);
                    deckQueries.createDeckDay(deck_day, req.body.day_id)
                      .then(result => {
                        res.json({deck_day_id: Number(result)})
                      })
                  })
              })
          } else {
            //insert to deck_category
            deckQueries.createDeckCategory(category[Object.keys(category)[0]].id, Number(id))
              .then(response => {
                deck_day['deck_id'] = Number(id);
                deckQueries.createDeckDay(id, req.body.day_id)
                  .then(result => {
                    res.json({deck_day_id: Number(result)})
                  })
              })
          }
        })
    })
})

//Create Card for Deck
router.post('/:id/decks/:num/card', (req, res) => {
  deckQueries.createCard(req.body, req.params.num)
    .then(card => {
      res.json()
    })
})

//Delete Card for Deck
router.delete('/:id/decks/:num/card/:cardNum', (req, res) => {
  deckQueries.deleteCard(req.params.cardNum)
    .then(card => {
      res.json({card: req.params.cardNum})
    })
})

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
router.put('/:id/decks/:num', (req, res, next) => {
  let promise = deckQueries.updateDeckInfo(req.params.id, req.body)
      .then(() => {
        return deckQueries.deleteDeckDay(req.params.id)
        .then(() => {
          return Promise.all(req.body.deckDays.map(day => {
            return deckQueries.getOneDeckDay(req.body.deck_id, day)
            .then(deck => {
              //if instance was not found, make a new one
              if (deck.length < 1) {
                return deckQueries.createDeckDay(req.body, day)
                //if instance was found, update existing
              } else {
                return deckQueries.updateDeck(req.params.num, req.params.num, req.body, day)
                .then(response => {
                  return deckQueries.updateDeckInfo(req.params.id, req.body)
                })
              }
            })
          }));
      })
  });

    promise.then(results => {
      res.json({message: 'completed!'})
    })
    .catch((error) => {
      console.log(error);
      next(error)
    })

});

function markCard(account, res, completed) {
  let status = completed ? 'completed' : 'incomplete';

  accountQueries.secondResUpdate(account.phone)
    .then(response => {
      deckQueries.updateCard(account.card_id, completed)
        .then(() => {
          const twiml = new MessagingResponse();
          twiml.message(`Card marked as ${status}!`);
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());
        })

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
      if (account.resCount == 0 && account.termSent == true) {
        accountQueries.firstResUpdate(account.phone)
          .then(response => {
              const twiml = new MessagingResponse();
              twiml.message(`Definition: ${account.definition} Respond with 'y' if your response was correct and 'n' if your response was incorrect!`);
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
});



module.exports = router;
