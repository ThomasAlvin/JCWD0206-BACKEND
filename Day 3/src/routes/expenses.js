const express = require('express');
const data = require('../data/db.json');
const fs = require('fs');
const router = express.Router();
const file = __dirname + '/../data/db.json';
const moment = require('moment');
//get all expenses
router.get('/', (req, res) => {
 res.send({
  message: 'Get all expenses',
  data: data.expenses
 });
});

//delete expense
router.delete('/:id', (req, res) => {
 const expense = data.expenses.find((val, idx) => {
  if (val.id == req.params.id) {
   console.log(idx);
   return data.expenses.splice(idx, 1);
  }
 });
 if (!expense) return res.status(400).send({ message: 'Expense ID not found' });

 fs.writeFile(file, JSON.stringify(data), () =>
  console.log(`Expense id ${req.params.id} has been deleted`)
 );
 res.send({
  message: `Expense id ${req.params.id} has been deleted`,
  data: expense
 });
});

//update expense
router.patch('/:id', (req, res) => {
 let index;
 let findExpense = data.expenses.find((val, idx) => {
  if (val.id == req.params.id) {
   index = idx;
   return val;
  }
 });
 console.log(findExpense);
 const { date, title, category, expense } = req.body;

 if (!findExpense)
  return res.status(400).send({ message: 'Expense ID not found' });
 else if (!date || !title || !category || !expense)
  return res.status(400).send({ message: 'data tidak lengkap' });
 findExpense = { ...findExpense, date, title, category, expense };

 data.expenses[index] = { ...findExpense };

 fs.writeFile(file, JSON.stringify(data), () =>
  console.log(`Expense id ${req.params.id} has been updated`)
 );
 res.send({
  message: `Expense id ${req.params.id} has been updated`,
  data: findExpense
 });
});

//insert expense
router.post('/', (req, res) => {
 const { date, title, category, expense } = req.body;
 if (!date || !title || !category || !expense)
  return res.status(400).send({ message: 'data tidak lengkap' });

 const newData = { id: data.counter.expenses, date, title, category, expense };
 data.counter.expenses++;
 data.expenses.push(newData);

 fs.writeFile(file, JSON.stringify(data), () =>
  console.log(`new expense data added`)
 );
 res.send({
  message: `new expense data added`,
  data: newData
 });
});

//get by date range
router.get('/by-dates', (req, res) => {
 let { dateFrom, dateTo } = req.query;

 if (!dateFrom || !dateTo)
  return res.status(400).send({ message: 'datefrom or dateto not found' });

 const message =
  'search expenses from ' +
  moment(dateFrom).format('LLL') +
  ' to ' +
  moment(dateTo).format('LLL');

 dateFrom = new Date(dateFrom); //5-5-2023  5-4-20
 dateTo = new Date(dateTo);

 const expenses = data.expenses.filter((val) => {
  let date = new Date(val.date);
  if (date >= dateFrom && date <= dateTo) {
   return val;
  }
 });

 const total = expenses.reduce((sum, val) => sum + val.expense, 0);

 res.send({
  message,
  data: total
 });
});

//get by categories
router.get('/by-categories', (req, res) => {
 const { category } = req.query;

 if (!category) return res.status(400).send({ message: 'category not found' });

 const expenses = data.expenses.filter((val) => val.category == category);
 //[ { title: "nonton", expense : 30000 }]
 const total = expenses.reduce((sum, val) => sum + val.expense, 0);
 //  prev,next
 // akumulator, current
 res.send({
  message: 'total expense by category ' + category,
  data: total
 });
});

//expense detail
router.get('/:id', (req, res) => {
 const expense = data.expenses.find((val) => val.id == req.params.id);
 if (!expense) return res.status(400).send({ message: 'Expense ID not found' });
 res.send({
  message: 'Get expense detail',
  data: expense
 });
});

module.exports = router;
