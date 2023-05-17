const { sequelize, Sequelize } = require('.');
module.exports = (sequelize, Sequelize) => {
 const Nilai = sequelize.define('Nilais', {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   allowNull: false,
   autoIncrement: true
  },
  nilai: {
   type: DataTypes.INTEGER
  },
  module: {
   type: DataTypes.STRING
  }
 });

 Nilai.associate = (models) => {
  Nilai.belongsTo(models.Program, {
   foreignKey: 'program_id'
  });
  models.Program.hasMany(Nilai, {
   foreignKey: 'program_id'
  });
 };

 return Nilai;
};
