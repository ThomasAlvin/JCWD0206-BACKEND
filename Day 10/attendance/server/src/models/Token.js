module.exports = (sequelize, Sequelize) => {
 const token = sequelize.define(
  'Tokens', //nama table
  {
   token: {
    type: Sequelize.STRING
   },
   expired: {
    type: Sequelize.DATE
   },
   payload: {
    type: Sequelize.STRING
   }
  }, // nama nama kolom
  {
   paranoid: true
  } // options
 );

 return token;
};
