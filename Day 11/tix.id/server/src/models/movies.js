module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define(
    "Movies",
    {
      name: {
        type: Sequelize.STRING,
      },
      producer: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
      },
      writer: {
        type: Sequelize.STRING,
      },
      cast: {
        type: Sequelize.STRING,
      },
      distributor: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      synopsis: {
        type: Sequelize.TEXT("long"),
      },
      genre: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.STRING,
      },
      dimensions: {
        type: Sequelize.STRING,
      },
      upcoming: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );

  return Movie;
};
