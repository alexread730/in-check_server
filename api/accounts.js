
const express = require('express');
const router = express.Router();
const accountQueries = require('../db/account_queries');

const knex = require('../db/knex')

router.get('/:id', (req, res) => {
  accountQueries.getOne(req.params.id)
    .then(account => {
      res.json(account);
    });
});

module.exports = router;
