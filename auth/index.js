const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const accountQueries = require('../db/account_queries');
const validation = require('./validation');

router.get('/', (req, res) => {
  res.json({
    message: "Authentication Endpoint Working"
  });
});

router.post('/signup', (req, res, next) => {
  if(validation.isUserValid(req.body)) {
    accountQueries.findUserByEmail(req.body.email)
      .then(user => {
        console.log("User: ", user)
        if(!user) {
          bcrypt.hash(req.body.password, 8)
            .then(hash => {
              const account = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                deckId: 0,
                lastText: 0,
                termSent: false,
                resCount: 0
              };
              accountQueries.createNewAccount(account)
                .then(id => {
                  jwt.sign({
                    id,
                  }, process.env.TOKEN_SECRET, {
                    expiresIn: '7d'
                  }, (err, token) => {
                    console.log('err ', err);
                    console.log('token', token);
                    res.json({
                      id,
                      email: account.email,
                      token,
                      message: "New Account Created"
                    });
                  });
                });
            });
        } else {
          next(new Error("Email is already in use"));
        }
      });
  } else {
    next(new Error("Invalid User"));
  }
});

router.post('/login', (req, res, next) => {
  if (validation.isLoginValid(req.body)) {
    accountQueries.findUserByEmail(req.body.email)
      .then(account => {
        if (account) {
          bcrypt.compare(req.body.password, account.password)
            .then(result => {
            if (result) {
              jwt.sign({
                id: account.id
              }, process.env.TOKEN_SECRET, {
                expiresIn: '7d'
              }, (err, token) => {
                console.log('err ', err);
                console.log('token', token);
                res.json({
                  id: account.id,
                  token,
                  message: "Logged In"
                });
              });
            } else {
              next(new Error("Invalid Email and/or Password"));
            }
          });
        } else {
          next(new Error("Invalid Email and/or Password"));
        }
      });
  } else {
    next(new Error("Invalid Email and/or Password"));
  }
});

module.exports = router;
