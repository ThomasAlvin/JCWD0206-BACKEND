module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define(
    "Tickets",
    {
      seat: {
        type: Sequelize.STRING,
      },
      availability: {
        type: Sequelize.STRING,
      },
      //   schedule_id: {
      //     type: Sequelize.STRING,
      //   },
    },
    {
      paranoid: true,
    }
  );

  return Ticket;
};
