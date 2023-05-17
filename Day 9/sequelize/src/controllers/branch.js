const db = require('../models');
const sequelize = require('sequelize');
const { Op } = db.Sequelize;
const branchController = {
 getAll: async (req, res) => {
  const branch = await db.Branch.findAll();
  return res.send(branch);
 },
 getById: async (req, res) => {
  const branch = await db.Branch.findOne({
   where: {
    id: req.params.id
   }
  });
  return res.send(branch);
 },
 countAll: async (req, res) => {
  const branch = await db.Branch.findAll({
   attributes: [[sequelize.fn('AVG', sequelize.col('id')), 'count_all'], 'id'],
   where: { id: 1 },
   group: 'id'
  });
  console.log(branch);
  return res.send(branch);
 },
 insertBranch: async (req, res) => {
  try {
   const { branch, address } = req.body;
   await db.Branch.create({
    branch,
    address
   });
   return await db.Branch.findAll().then((result) => {
    res.send(result);
   });
  } catch (err) {
   console.log(err);
   return res.status(500).send({
    message: err.message
   });
  }
 },
 editBranch: async (req, res) => {
  try {
   const { branch, address } = req.body;
   await db.Branch.update(
    {
     branch,
     address
    },
    {
     where: {
      id: req.params.id
     }
    }
   );

   return await db.Branch.findOne({
    where: {
     id: req.params.id
    }
   }).then((result) => res.send(result));
  } catch (err) {
   console.log(err.message);
   res.status(500).send({
    message: err.message
   });
  }
 },
 deleteBranch: async (req, res) => {
  try {
   await db.Branch.destroy({
    where: {
     //  id: req.params.id
     id: {
      //   [Op.eq]: req.params.id
      [Op.or]: [
       {
        id: req.params.id
       },
       {
        branch: 'BATAM'
       }
      ]
     }
    }
   });
   return await db.Branch.findAll().then((result) => res.send(result));
  } catch (err) {
   console.log(err.message);
   return res.status(500).send({
    message: err.message
   });
  }
 }
};

module.exports = branchController;

// transaction
// id , transnumber , total

// 1, 'trx001', 3

// transactionDetail
// id, productId, qty, transactionId
// 1, 1, 2, 1
// 2, 2, 1 , 1

// transactionDetail.belongsTo(transaction)
// transaction.hasMany(transactionDetail)
