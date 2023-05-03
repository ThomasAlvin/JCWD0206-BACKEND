const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use((err, req, res, next) => {
 console.log('test');
 console.error(err.stack);
 res.status(500).send('something broke!');
});

const users = [
 {
  email: 'email@mail.com',
  username: 'username'
 },
 {
  email: 'email2@mail.com',
  username: 'username2'
 }
];
//
app.get('/', (req, res) => {
 res.send('REST API menggunakan express');
});

//ini adalah get users tanpa params
app.get('/users', (req, res) => {
 console.log(req.query);
 const { email, username } = req.query;
 if (email && username) {
  const data = users.find(
   (val) => val.username == username && val.email == email
  );

  return res.send(data);
 }

 res.send(users);
});

//ini adalah get users menggunakan req.params
app.get('/users/:username', (req, res) => {
 console.log(req.params.username);
 //localhost:2000/users/udin
 //maka req.params.username adalah udin

 const data = users.find((val) => val.username == req.params.username);

 res.send(data);
});

app.post('/users', (req, res) => {
 const data = req.body;
 users.push(data);
 res.send({
  message: 'data telah diupdate',
  data: users
 });
});

app.delete('/users/:username', (req, res) => {
 const { username } = req.params;
 let index = -1;
 users.find((val, idx) => {
  if (val.username == username) {
   index = idx;
  }
 });

 users.splice(index, 1);

 res.send({
  message: 'data berhasil dihapus',
  data: users
 });
});

app.patch('/users/:username', (req, res) => {
 const { username } = req.params;
 const data = req.body;
 console.log(data);

 let index = -1;
 users.find((val, idx) => {
  if (val.username == username) {
   index = idx;
  }
 });

 users[index].email = data.email;

 res.send({
  message: 'data berhasil diedit',
  data: users[index]
 });
});

// app.get("/welcome-to-party")

app.get('/auth/v1');
app.get('/auth/v2');

// sql query = 'insert into table (data)

//routes
//route ini akan match dengan acd dan abcd
// b? artinya boleh ada b atau tidak
app.get('/ab?cd', (req, res) => res.send('ab?cd'));

//route ini akan match dengan abcd, abbcd, abbbbcd, dan seterusnya
//base url tetap abcd, tetapi b bisa lebih dari 1
app.get('/ab+cd', (req, res) => res.send('ab+cd'));

//route ini akan match dengan abcd, abzcd, abRandomcd, dan seterusnya
//base url abcd, tetapi karakter * bisa diubah dengan karakter apapun
app.get('/ab*cd', (req, res) => res.send('ab*cd'));

//route ini akan match dengan /abe, /abcde
app.get('/ab(cd)?e', (req, res) => res.send('ab(cd)?e'));

//route ini akan match dengan semua string yg ada huruf 'a'
// app.get(/a/, (req, res) => res.send('/a/'));

//route ini akan match dengan semua kata fly
//tetapi tidak untuk kata lain dibelakang fly
// butterfly,dragonfly => boleh
//butterflyman => tidak boleh
app.get(/.*fly$/, (req, res) => res.send('/.*fly$/'));

app.get('/users/:userId/books/:bookId', (req, res) => {
 // apabila user dengan id tertentu
 // dan memiliki buku dengan id buku tertentu juga
 //localhost:2000/users/1/books/3
 // object req.params memiliki keys userId, bookId
 //userId dan bookId sesuai dengan params yg kita ketik di path
 // sedangkan untuk value userId dan bookId
 // sesuai dengan yg kita ketik di url

 res.send(req.params);
});

//method get memiliki parameter/arg (path, rest parameter)
// app.get('PATH', (req,res,next),  (req,res,next), (req,res))

app.get(
 '/example/b',
 (req, res, next) => {
  console.log('resnya ada di function berikutnya');
  next();
 },
 (req, res) => {
  res.send('hello from B!');
 }
);

app.listen(PORT, () => {
 console.log(`server ini berjalan di PORT ${PORT}`);
});
