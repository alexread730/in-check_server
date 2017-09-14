const express = require('express');
const router = express.Router();
const accountQueries = require('../db/account_queries');
const deckQueries = require('../db/deck_queries');

const knex = require('../db/knex');

const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const accountSid = 'AC2ca2a7c7a4f24588299ba6c63c15940d';
const authToken = '0c3d035a8436dd0ca48e69431497159e';

const client = new twilio(accountSid, authToken);

const today = new Date();
const dayNumber = today.getDay();
let respondData = [];

deckQueries.getAllDecks()
  .then(decks => {
    let promises = decks.filter(deck => {
      return deck.day_number == dayNumber
    }).map(deck => {
      console.log(deck);

        return deckQueries.getDeckCards(null, deck.deck_id)
          .then(cards => {
            let randomNum = Math.floor((Math.random() * cards.length));
            let currentCard = cards[randomNum];
             return accountQueries.updateCard(currentCard, deck.account_id)

            //post term, defition, lastDeck, and lastTextSent to deck

            // console.log(cards);
            // return client.messages.create({
            //   body: cards[0].term,
            //   to: `+1${deck.phone}`,
            //   from: '+14144093022'
            // })

          });

    })
    Promise.all(promises)
      .then(results => {
        // console.log(respondData);
        console.log(results);
        // process.exit();
      });
  });


// module.exports = router;
