module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "Orders",
    {
      order_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      total: {
        type: Sequelize.INTEGER,
      },
    },
    {
      paranoid: true,
    }
  );

  return Order;
};
