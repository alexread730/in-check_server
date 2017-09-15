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
const currentHour = today.getHours();

function filterDecks(decks) {

  //filters to send to decks on current day
  return allDecks = decks.filter(deck => {
      return deck.day_number == dayNumber
    })
    //filters to send to only active decks
    .filter(deck => {
      return (deck.active == true);
    })
    //filters to send to decks within star and end time
    .filter(deck => {
      return (deck.startTime <= currentHour && deck.endTime >= currentHour)
    })
    .filter(deck => {
      return (deck.termSent === false)
    })

}

deckQueries.getAllDecks()
  .then(decks => {
    let promises = filterDecks(decks)
    .map(deck => {
      console.log("deck: ",deck);
        //retrieve cards for the chosen deck
        return deckQueries.getDeckCards(null, deck.deck_id)
          .then(cards => {
            //pick a random card
            let randomNum = Math.floor((Math.random() * cards.length));
            let currentCard = cards[randomNum];
            //update account with current card
             return accountQueries.updateCard(currentCard, deck.account_id)
                .then(response => {
                  return accountQueries.updateAccount(deck.account_id, deck.deck_id)
                  //post term, defition, lastDeck, and lastTextSent to deck

                  // return client.messages.create({
                  //   body: currentCard.term,
                  //   to: `+1${deck.phone}`,
                  //   from: '+14144093022'
                  // })
                })
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
