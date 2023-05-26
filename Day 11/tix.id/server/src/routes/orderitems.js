const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers").orderItemController;
//get

router.get("/", orderItemController.getAll);
router.get("/:id", orderItemController.getById);
router.post("/v1", orderItemController.insertOrderItem);
router.patch("/v2/:id", orderItemController.editOrderItem);
router.delete("/v3/:id", orderItemController.deleteOrderItem);

module.exports = router;
