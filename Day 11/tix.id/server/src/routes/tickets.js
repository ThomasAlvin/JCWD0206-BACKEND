const express = require("express");
const router = express.Router();
const ticketController = require("../controllers").ticketController;
//get

router.get("/", ticketController.getAll);
router.get("/:id", ticketController.getById);
router.post("/v1", ticketController.insertTicket);
router.patch("/v2/:id", ticketController.editTicket);
router.delete("/v3/:id", ticketController.deleteTicket);

module.exports = router;
