const express = require('express');
const route = express.Router();
const data = require('../data/db.json');
const fs = require('fs');

//get all
route.get('/', (req, res) => {
 const users = data.users.map((val) => {
  delete val.password;
  return val;
 });
 res.send({
  message: 'data fetched',
  data: users
 });
});

module.exports = route;
