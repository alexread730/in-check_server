const express = require('express');
const router = express.Router();
const accountQueries = require('../db/account_queries');
const deckQueries = require('../db/deck_queries');

const knex = require('../db/knex')

const twilio = require('twilio');

const accountSid = 'AC2ca2a7c7a4f24588299ba6c63c15940d';
const authToken = '0c3d035a8436dd0ca48e69431497159e';

const client = new twilio(accountSid, authToken);


deckQueries.getAllDecks()
  .then(decks => {
    decks.forEach(deck => {
      console.log(deck);
      if (deck.day_name == 'Wednesday') {
        client.messages.create({
          body: 'First text motherfucker!',
          to: deck.phone,
          from: '+14144093022'
        })
        .then((message) => console.log(message.sid));
      }
    })
  });
