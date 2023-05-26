const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const ticketController = {
  getAll: async (req, res) => {
    try {
      const ticket = await db.Ticket.findAll();
      return res.send(ticket);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const ticket = await db.Ticket.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(ticket);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editTicket: async (req, res) => {
    try {
      const { seat, availability, ScheduleId } = req.body;
      await db.Ticket.update(
        {
          seat,
          availability,
          ScheduleId,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Ticket.findOne({
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
  insertTicket: async (req, res) => {
    try {
      const { seat, availability, ScheduleId } = req.body;
      await db.Ticket.create({
        seat,
        availability,
        ScheduleId,
      });
      return await db.Ticket.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteTicket: async (req, res) => {
    try {
      await db.Ticket.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Ticket.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = ticketController;
