module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("Cities", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return City;
};
