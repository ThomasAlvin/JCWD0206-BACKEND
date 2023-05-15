const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT;
const db = require('./database/config');
const moment = require('moment');

app.use(cors());
app.use(express.json());

db.connect((err) => {
 if (err) console.log(err);
 else console.log('mysql connected');
});

let queryString = '';

app.get('/todos', (req, res) => {
 queryString = `select id,judul,date,description  'desc' from todos`;
 db.query(queryString, (err, result) => {
  if (err)
   return res.status(500).send({
    message: err.message
   });
  res.send(result);
 });
});

//add todo baru
app.post('/todos', (req, res) => {
 console.log(req.body);
 const { judul, date, desc } = req.body;
 queryString = `insert into todos (judul,date,description) values('${judul}','${date}', '${desc}')`;
 db.query(queryString, (err, result) => {
  if (err) {
   console.log(err);
   return res.status(500).send({
    message: err.message
   });
  }

  res.send(result);
 });
 //  res.send();
});

app.delete('/todos/:id', (req, res) => {
 console.log(req.params);
 queryString = `delete from todos where id = ${req.params.id}`;
 db.query(queryString, (err, result) => {
  if (err) {
   console.log(err);
   return res.status(500).send({
    message: err.message
   });
  }

  res.send(result);
 });
 //  res.send();
});

app.get('/todos/:id', (req, res) => {
 queryString = `select id,judul,date,description  'desc' from todos where id = ${req.params.id}`;
 db.query(queryString, (err, result) => {
  if (err)
   return res.status(500).send({
    message: err.message
   });
  const rs = { ...result[0] };
  rs.date = moment(rs.date).format().split('T')[0];
  res.send(rs);
 });
});
app.get('/student/:id', (req, res) => {
 const { firstName, lastName } = req.body;
 queryString = `select * from students where firstName = '${firstName}' and lastName = '${lastName}' `;
 db.query(queryString, (err, result) => {
  if (err) {
   console.log(err);
   return res.status(500).send({
    message: err.message
   });
  }

  res.send(result);
 });
 //  res.send(queryString);
});

app.patch('/todos/:id', (req, res) => {
 console.log(req.params);
 console.log(req.body);
 const { judul, date, desc } = req.body;
 queryString = `update todos set judul = '${judul}', date = '${date}', description =  '${desc}' where id = ${req.params.id}`;
 db.query(queryString, (err, result) => {
  if (err) {
   console.log(err);
   return res.status(500).send({
    message: err.message
   });
  }

  res.send(result);
 });
 //  res.send();
});

app.get('/', (req, res) => res.send('ini adalah rest api todo list'));

app.listen(PORT, () => {
 console.log('server is running on PORT ' + PORT);
});
