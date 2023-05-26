module.exports = (sequelize, Sequelize) => {
  const orderItem = sequelize.define(
    "OrderItems",
    {
      //   ticket_id: {
      //     type: Sequelize.INTEGER,
      //   },
      //   order_id: {
      //     type: Sequelize.INTEGER,
      //   },
      //   user_id: {
      //     type: Sequelize.INTEGER,
      //   },
    },
    {
      paranoid: true,
    }
  );

  return orderItem;
};
