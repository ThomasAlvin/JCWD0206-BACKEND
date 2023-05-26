const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const scheduleController = {
  getAll: async (req, res) => {
    try {
      const schedule = await db.Schedule.findAll();
      return res.send(schedule);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const schedule = await db.Schedule.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(schedule);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editSchedule: async (req, res) => {
    try {
      const { schedule, price, MovieId, TheaterId, studio } = req.body;
      await db.Schedule.update(
        {
          schedule,
          price,
          MovieId,
          TheaterId,
          studio,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Schedule.findOne({
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
  insertSchedule: async (req, res) => {
    try {
      const { schedule, price, MovieId, TheaterId, studio } = req.body;
      await db.Schedule.create({
        schedule,
        price,
        MovieId,
        TheaterId,
        studio,
      });
      return await db.Schedule.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      await db.Schedule.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Schedule.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = scheduleController;
