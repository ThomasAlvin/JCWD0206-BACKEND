module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("Schedules", {
    // movie_id: {
    //   type: Sequelize.INTEGER,
    // },
    // theater_id: {
    //   type: Sequelize.INTEGER,
    // },
    schedule: {
      type: Sequelize.DATE,
    },
    studio: {
      type: Sequelize.ENUM("1", "2", "3", "4", "5", "6"),
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });

  return Schedule;
};
