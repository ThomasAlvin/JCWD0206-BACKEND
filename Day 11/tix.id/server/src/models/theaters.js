module.exports = (sequelize, Sequelize) => {
  const Theater = sequelize.define(
    "Theaters",
    {
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      //   city_id: {
      //     type: Sequelize.INTEGER,
      //   },
    },
    {
      paranoid: true,
    }
  );

  return Theater;
};
