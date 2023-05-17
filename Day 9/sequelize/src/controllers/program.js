const db = require('../models');

const programController = {
 getAll: async (req, res) => {
  try {
   const programs = await db.Program.findAll({
    include: [
     db.Branch,
     db.Lecturer
     //  { model: db.Branch, as: 'Branch' },
     //  { model: db.Lecturer, as: 'Lecturer' }
    ]
   });

   return res.send(programs);
  } catch (err) {
   res.status(500).send({
    message: err.message
   });
  }
 },
 insertProgramV1: async (req, res, next) => {
  try {
   const { branch, branch_address, name, l_address, program } = req.body;
   const result = await db.sequelize.transaction(async () => {
    // input branch
    const newBranch = await db.Branch.create({
     branch,
     address: branch_address
    });
    console.log(newBranch.dataValues);

    //input lecturer
    const newLecturer = await db.Lecturer.create({
     name,
     address: l_address
    });
    console.log(newLecturer.dataValues);

    //input program
    const newProgram = await db.Program.create({
     program,
     lecturer_id: newLecturer.dataValues.id,
     branch_id: newBranch.dataValues.id
    });
    console.log(newProgram.dataValues);
   });
   //    console.log(result);
   next();
  } catch (err) {
   res.status(500).send({
    message: err.message
   });
  }
 }
};

module.exports = programController;

// playlist = {
//     id :1,
//     music: {
//         id : 1,
//         title,
//         singer
//     }
// }
// playlist.music

// transaksi = [
//  {
//   id: 1,
//   trans_number: 'trx001',
//   total: 5,
//   productName: 'sabun'
//  },
//  {
//   id: 1,
//   trans_number: 'trx001',
//   total: 5,
//   productName: 'sikat gigi'
//  }
// ];

// transaksi = [
//  {
//   id: 1,
//   trans_number: 'trx001',
//   total: 5,
//   productDetails: [
//    {
//     productName: 'sabun'
//    },
//    {
//     productName: 'sikat gigi'
//    }
//   ]
//  }
// ];

// transaksi[0].trans_number
// transaksi[0].productDetails.map(() => {

// })
