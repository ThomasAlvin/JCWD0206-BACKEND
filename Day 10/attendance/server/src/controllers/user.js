const db = require('../models');

const userController = {
 register: async (req, res) => {
  try {
   await db.User.create({
    email,
    password,
    name,
    address,
    CompanyId
   });
   const { email, password, name, address, CompanyId } = req.body;

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
     email,
     password
    }
   });

   if (!user?.dataValues.id) {
    return res.send({
     message: 'login gagal'
    });
   }

   return res.send({
    message: 'login berhasil',
    value: user
   });
  } catch (err) {
   console.log(err.message);
   return res.status(500).send(err.message);
  }
 }
};

module.exports = userController;
