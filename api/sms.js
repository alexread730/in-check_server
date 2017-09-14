const express = require('express');
const router = express.Router();
const accountQueries = require('../db/account_queries');
const deckQueries = require('../db/deck_queries');

const knex = require('../db/knex')

const twilio = require('twilio');

const accountSid = 'AC2ca2a7c7a4f24588299ba6c63c15940d';
const authToken = '0c3d035a8436dd0ca48e69431497159e';

const client = new twilio(accountSid, authToken);

const today = new Date();
const dayNumber = today.getDay();

deckQueries.getAllDecks()
  .then(decks => {
    let i = 1;

    decks.forEach(deck => {
      let deckCards = [];
      if (deck.day_number == dayNumber) {
        // console.log(i, deck.deck_id);

        deckQueries.getDeckCards(null, deck.deck_id)
          .then(cards => {
            deckCards = cards
            // console.log(deckCards[0], deck.phone);
            client.messages.create({
              body: deckCards[0].term,
              to: `+1${deck.phone}`,
              from: '+14144093022'
            })
            .then((message) => console.log(message.sid));
          });


      }
      i++;

    })
  });
