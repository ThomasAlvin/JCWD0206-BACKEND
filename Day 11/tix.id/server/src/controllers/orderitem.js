const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const orderItemController = {
  getAll: async (req, res) => {
    try {
      const orderItem = await db.OrderItem.findAll();
      return res.send(orderItem);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const orderItem = await db.OrderItem.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(orderItem);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editOrderItem: async (req, res) => {
    try {
      const { Orderid, Ticketid, Userid } = req.body;
      await db.OrderItem.update(
        {
          Orderid,
          Ticketid,
          Userid,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.OrderItem.findOne({
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
  insertOrderItem: async (req, res) => {
    try {
      const { OrderId, TicketId, UserId } = req.body;
      await db.OrderItem.create({
        OrderId,
        TicketId,
        UserId,
      });
      return await db.OrderItem.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteOrderItem: async (req, res) => {
    try {
      await db.OrderItem.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.OrderItem.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = orderItemController;
