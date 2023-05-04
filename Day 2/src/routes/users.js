const express = require('express');
const route = express.Router();
const data = require('../data/db.json');
const fs = require('fs');
const { log } = require('console');

//get all
route.get('/', (req, res) => {
 const users = data.users.map((val) => {
  const user = { ...val };
  delete user.password;
  return user;
 });
 res.send({
  message: 'data fetched',
  data: users
 });
});

//login
route.get('/v1', (req, res) => {
 const { euser, password } = req.query;
 console.log(req.query);
 let user;
 data.users.find((val) => {
  (val.email == euser || val.username == euser) && val.password == password
   ? (user = { ...val })
   : null;
 });
 console.log(data.users);
 if (user) {
  delete user.password;

  return res.status(200).send({
   message: 'login successful',
   data: user
  });
 }
 return res.status(400).send({
  message: 'login failed'
 });
});

//register
route.post('/v2', (req, res) => {
 const { email, username, password } = req.body;
 if (email && username && password) {
  const newUser = {
   id: data.counter.users,
   email,
   username,
   password
  };

  console.log(newUser);

  data.users.push(newUser);
  data.counter.users++;

  fs.writeFile(__dirname + '/../data/db.json', JSON.stringify(data), () => {
   console.log('data baru');
  });
  return res.status(201).send({
   message: 'berhasil register'
  });
 }
 return res.status(400).send({
  message: 'gagal register karena data belum lengkap'
 });
});

// //register
// route.post('/v2', (req, res) => {
//  const { email, password, username } = req.body;
//  const id = data.counter.users;
//  const newUser = { id, email, password, username };
//  data.users.push(newUser);
//  data.counter.users++;
//  fs.writeFile(__dirname + '/../data/db.json', JSON.stringify(data), () => {
//   console.log('success');
//  });
//  res.status(200).send(data.users);
// });

module.exports = route;
