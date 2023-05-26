const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const image_url_movie = process.env.URL_IMAGE;
const movieController = {
  getAll: async (req, res) => {
    try {
      const movie = await db.Movie.findAll();
      return res.send(movie);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const movie = await db.Movie.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(movie);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editMovie: async (req, res) => {
    try {
      const {
        name,
        producer,
        director,
        writer,
        cast,
        distributor,
        website,
        duration,
        synopsis,
        genre,
        rating,
        dimensions,
        upcoming,
        img_url,
      } = req.body;
      await db.Movie.update(
        {
          name,
          producer,
          director,
          writer,
          cast,
          distributor,
          website,
          duration,
          synopsis,
          genre,
          rating,
          dimensions,
          upcoming,
          img_url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Movie.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  insertMovie: async (req, res) => {
    try {
      const {
        name,
        producer,
        director,
        writer,
        cast,
        distributor,
        website,
        duration,
        synopsis,
        genre,
        rating,
        dimensions,
        upcoming,
      } = req.body;
      const { filename } = req.file;
      console.log("lol");
      await db.Movie.create({
        name,
        producer,
        director,
        writer,
        cast,
        distributor,
        website,
        duration,
        synopsis,
        genre,
        rating,
        dimensions,
        upcoming,
        img_url: image_url_movie + filename,
      });
      return await db.Movie.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteMovie: async (req, res) => {
    try {
      await db.Moviedestroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Movie.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = movieController;
