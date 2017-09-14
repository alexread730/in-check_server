const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const query = require('../db/account_queries.js');

function validUser(user) {

  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPass = typeof user.password == 'string' && user.password.trim() != '';
  return validEmail && validPass;
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    query.findUserByEmail(req.body.email)
      .then(account => {
        if (account) {
          next(new Error('Email in Use'));
        } else {

          const account = {
            email: req.body.email
          }

          bcrypt.hash(req.body.password, 8)
          .then((hash) => {
            account.password = hash;
            query.addAccount(account)
              .then(account => {
                res.json(account)
              })
          });
        }
      })
  } else {
    next(new Error('Invalid User'))
  }
});

router.post('/login', (req, res, next) => {
  if (validUser(req.body)) {
    query.findUserByEmail(req.body.email)
      .then(account => {
        if (account) {

          bcrypt.compare(req.body.password, account.password)
            .then(result => {
              if (result) {
                res.json({
                  result,
                  message: account
                });
              } else {
                next(new Error('Invalid password'));
              }
            });

        } else {
          res.json('You are not admitted!')
        }
      })
  } else {
    next(new Error('Invalid User'))
  }
});

module.exports = router;
