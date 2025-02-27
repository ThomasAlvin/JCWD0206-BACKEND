'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
 sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
 );
}

fs
 .readdirSync(__dirname)
 .filter((file) => {
  return (
   file.indexOf('.') !== 0 &&
   file !== basename &&
   file.slice(-3) === '.js' &&
   file.indexOf('.test.js') === -1
  );
 })
 .forEach((file) => {
  const model = require(path.join(__dirname, file))(
   sequelize,
   Sequelize.DataTypes
  );
  db[model.name] = model;
 });

Object.keys(db).forEach((modelName) => {
 if (db[modelName].associate) {
  db[modelName].associate(db);
 }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Token = require('./Token')(sequelize, Sequelize);
db.Attendance = require('./Attendance')(sequelize, Sequelize);
db.Company = require('./Company')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);

db.User.belongsTo(db.Company);
db.Attendance.belongsTo(db.User);

// db.Program.belongsTo(db.Branch, {
//     foreignKey: 'branch_id'
//    });
   
//    db.Program.belongsTo(db.Lecturer, {
//     foreignKey: 'lecturer_id'
//    });
   
//    db.Branch.hasMany(db.Program, {
//     foreignKey: 'branch_id'
//    });
//    db.Lecturer.hasMany(db.Program, {
//     foreignKey: 'lecturer_id'
//    });

module.exports = db;

