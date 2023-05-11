const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'password',
 database: 'db_purwadhika',
 port: 3306
});

db.connect((err) => {
 if (err) console.log(err);
 else console.log('mysql connected');
});

let queryString = '';

router.get('/', (req, res) => {
 //get all from students
 queryString = 'SELECT * FROM students ';
 db.query(queryString, (err, result) => {
  if (err)
   return res.status(500).send({
    message: err.message
   });
  else return res.send(result);
 });
});

router.get('/:id', (req, res) => {
 queryString = 'SELECT * FROM students where id = ' + req.params.id;
 db.query(queryString, (err, result) => {
  if (err)
   return res.status(500).send({
    message: err.message
   });
  else return res.send(...result);
 });
});

module.exports = router;

// buatlah api untuk front todo list berikut dengan databasenya
//
