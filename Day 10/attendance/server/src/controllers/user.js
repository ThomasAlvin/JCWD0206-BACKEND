const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const private_key = process.env.private_key;
const { nanoid } = require('nanoid');
const moment = require('moment');
const url = process.env.URL;
const mailer = require('../lib/mailer');
const userController = {
 register: async (req, res) => {
  try {
   const { email, password, name, address, CompanyId } = req.body;
   const hashPassword = await bcrypt.hash(password, 10);
   console.log(hashPassword);

   await db.User.create({
    email,
    password: hashPassword,
    name,
    address,
    CompanyId
   });

   return res.send({
    message: 'register berhasil'
   });
  } catch (err) {
   console.log(err.message);
   return res.status(500).send(err.message);
  }
 },

 login: async (req, res) => {
  try {
   const { email, password } = req.body;

   const user = await db.User.findOne({
    where: {
     email
    }
   });

   //    console.log(user);

   if (user) {
    const match = await bcrypt.compare(password, user.dataValues.password);
    if (match) {
     const payload = {
      id: user.dataValues.id
     };
     const token = jwt.sign(payload, private_key, {
      expiresIn: '1h'
     });

     console.log(token);
     //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6InVkaW4yIiwiYWRkcmVzcyI6ImJhdGFtIiwicGFzc3dvcmQiOiIkMmIkMTAkWUkvcTl2dVdTOXQ0R1V5a1lxRGtTdWJnTTZwckVnRm9nZzJLSi9FckFHY3NXbXBRUjFOcXEiLCJlbWFpbCI6InVkaW4yQG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJDb21wYW55SWQiOm51bGwsImlhdCI6MTY4NDQ4MzQ4NSwiZXhwIjoxNjg0NDgzNTQ1fQ.Ye5l7Yml1TBWUgV7eUnhTVQjdT3frR9E0HXNxO7bTXw;

     return res.send({
      message: 'login berhasil',
      value: user,
      token
     });
    } else {
     throw new Error('wrong password');
    }
   } else {
    throw new Error('user not found');
   }
  } catch (err) {
   console.log(err.message);
   return res.status(500).send({ message: err.message });
  }
 },
 loginV2: async (req, res) => {
  try {
   const { email, password } = req.body;

   const user = await db.User.findOne({
    where: {
     email
    }
   });

   if (user) {
    const match = await bcrypt.compare(password, user.dataValues.password);
    if (match) {
     const payload = {
      id: user.dataValues.id
     };

     const generateToken = nanoid();
     console.log(nanoid());
     const token = await db.Token.create({
      expired: moment().add(1, 'days').format(),
      token: generateToken,
      payload: JSON.stringify(payload)
     });

     console.log(token);
     //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6InVkaW4yIiwiYWRkcmVzcyI6ImJhdGFtIiwicGFzc3dvcmQiOiIkMmIkMTAkWUkvcTl2dVdTOXQ0R1V5a1lxRGtTdWJnTTZwckVnRm9nZzJLSi9FckFHY3NXbXBRUjFOcXEiLCJlbWFpbCI6InVkaW4yQG1haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xOVQwNzowOTozNy4wMDBaIiwiZGVsZXRlZEF0IjpudWxsLCJDb21wYW55SWQiOm51bGwsImlhdCI6MTY4NDQ4MzQ4NSwiZXhwIjoxNjg0NDgzNTQ1fQ.Ye5l7Yml1TBWUgV7eUnhTVQjdT3frR9E0HXNxO7bTXw;

     return res.send({
      message: 'login berhasil',
      value: user,
      token: token.dataValues.token
     });
    } else {
     throw new Error('wrong password');
    }
   } else {
    throw new Error('user not found');
   }
  } catch (err) {
   console.log(err.message);
   return res.status(500).send({ message: err.message });
  }
 },

 getCompanies: async (req, res) => {
  await db.Company.findAll().then((data) => res.send(data));
 },

 getByToken: async (req, res) => {
  const { token } = req.query;
  let user = jwt.verify(token, private_key);

  user = await db.User.findOne({
   where: {
    id: user.id
   }
  });

  delete user.dataValues.password;

  res.send(user);
 },
 getByTokenV2: async (req, res, next) => {
  try {
   const { token } = req.query;
   console.log(token);
   let p = await db.Token.findOne({
    where: {
     token,
     expired: {
      [db.Sequelize.Op.gte]: moment().format()
     },
     valid: true
    }
   });

   // select * from tokes where token ="abc" and expired >= "2023-05-23"
   // and valid = true

   if (!p) {
    throw new Error('token has expired');
   }
   console.log(p.dataValues);
   user = await db.User.findOne({
    where: {
     id: JSON.parse(p.dataValues.payload).id
    }
   });
   //id,email,nama,password,dll

   delete user.dataValues.password;

   req.user = user;
   next();
  } catch (err) {
   console.log(err);
   return res.status(500).send({ message: err.message });
  }
 },

 getUserByToken: async (req, res) => {
  res.send(req.user);
 },

 generateTokenByEmail: async (req, res) => {
  try {
   const { email } = req.query;

   const user = await db.User.findOne({
    where: {
     email
    }
   });

   if (user.dataValues) {
    // cek apa ada token yg mengarah ke id user tsb
    await db.Token.update(
     {
      valid: false
     },
     {
      where: {
       payload: JSON.stringify({ id: user.dataValues.id }),
       // { "id" : 1 }
       status: 'FORGOT-PASSWORD'
      }
     }
    );

    const generateToken = nanoid();
    const token = await db.Token.create({
     expired: moment().add(5, 'minutes').format(),
     token: generateToken,
     payload: JSON.stringify({ id: user.dataValues.id }),
     status: 'FORGOT-PASSWORD'
    });

    mailer({
     subject: 'hello',
     to: 'zcqvfoante@internetkeno.com',
     text: url + token.dataValues.token
    });

    // return res.send({ url: url + token.dataValues.token });
    // return res.send({
    //  nav: '/forgot-password/' + token.dataValues.token
    //  // nav : "/forgot-password/abc123"
    // });

    return res.send({ message: 'silahkan check email anda' });
   } else {
    throw new Error('user not found');
   }
  } catch (err) {
   res.status(500).send({ message: err.message });
  }
 },
 changePassword: async (req, res) => {
  try {
   const { token } = req.query;

   const { password } = req.body.user;
   const { id } = req.user;

   console.log(id);

   const hashPassword = await bcrypt.hash(password, 10);

   await db.User.update(
    {
     password: hashPassword
    },
    {
     where: {
      id
     }
    }
   );

   await db.Token.update(
    {
     valid: false
    },
    {
     where: {
      token
     }
    }
   );

   res.send({
    message: 'password berhasil diupdate'
   });
  } catch (err) {
   res.status(500).send({ message: err.message });
  }
 }
};

module.exports = userController;

// hello3 salt 1 => abc123456c=> hello3 =>
// hello3a salt 2 => abc654321 => heallo3 =>

// hoc => token localstorage => req backend get
// user by id => respond => dispatch

// http://localhost:3000/forgot-password/DIjeA2YhdvH06CbRG1Mmk
