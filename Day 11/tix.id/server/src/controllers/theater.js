const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const theaterController = {
  getAll: async (req, res) => {
    try {
      const theater = await db.Theater.findAll();
      return res.send(theater);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const theater = await db.Theater.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(theater);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editTheater: async (req, res) => {
    try {
      const { name, address, CityId } = req.body;
      await db.Theater.update(
        {
          name,
          address,
          CityId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Theater.findOne({
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
  insertTheater: async (req, res) => {
    try {
      const { name, address, CityId } = req.body;
      await db.Theater.create({
        name,
        address,
        CityId,
      });
      return await db.Theater.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteTheater: async (req, res) => {
    try {
      await db.Theater.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Theater.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = theaterController;
