const http = require('http');
const PORT = 2000;

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
const server = http.createServer(async (req, res) => {
 const method = req.method;
 const path = req.url.split('/')[1];

 if (method === 'GET') {
  //apa bila path =  api
  if (path === 'api') {
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.write('Hi there, this is a vanilla Node.js API');
   res.end();
  } else if (path === 'users') {
   const username = req.url.split('/')[2];
   res.writeHead(200, { 'Content-Type': 'application/json' });

   if (username) {
    let user = users.find((val) => val.username == username);
    if (!user) {
     return res.end('user tidak ditemukan');
    }
    res.write(JSON.stringify(user));

    return res.end();
   }
   res.write(JSON.stringify(users));

   //1. perhatikan peletakan array kalian sebelum dikirim
   //2. array tidak bisa langsung dikirim, harus berupa string
   res.end();
  }
 } else if (method === 'POST') {
  if (path === 'users') {
   req.on('data', (data) => {
    console.log(JSON.parse(data));
    users.push(JSON.parse(data));
   });
   console.log('abc');
   res.end('data berhasil diinput');
  }
 } else if (method === 'PATCH') {
  if (path === 'users') {
   req.on('data', (data) => {
    //cari username yang ada di setelah slash username
    const username = req.url.split('/')[2];
    //buat sebuah variable index dengan -1
    let index = -1;

    //buat sebuah variable user
    users.find((val, idx) => {
     if (val.username == username) {
      return (index = idx);
     }
    });

    console.log(index);
    if (index == -1) {
     return res.end('username tidak ditemukan');
    }
    users[index].email = JSON.parse(data).email;

    res.end('data berhasil diedit');
   });

   // users/username2
   // ['','users','username2']
   //edit email dari users . dengan filter usernamenya
   //username2 => cari dia itu index ke berapa di dalam users
   // data.email => users[??].email
  }
 } else if (method === 'DELETE') {
  if (path === 'users') {
   const username = req.url.split('/')[2];
   let index = -1;

   //buat sebuah variable user
   users.find((val, idx) => {
    if (val.username == username) {
     return (index = idx);
    }
   });

   console.log(index);
   if (index == -1) {
    return res.end('username tidak ditemukan');
   }

   users.splice(index, 1);
   res.end('data berhasil didelete');
  }
 }
});

server.listen(PORT, () => {
 console.log(`server started on port ${PORT}`);
});
