const express = require('express');

const app = express();
const PORT = 2000;

app.use(express.json());

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

app.listen(PORT, () => {
 console.log(`server ini berjalan di PORT ${PORT}`);
});
