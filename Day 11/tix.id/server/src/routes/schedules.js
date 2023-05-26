const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers").scheduleController;
//get

router.get("/", scheduleController.getAll);
router.get("/:id", scheduleController.getById);
router.post("/v1", scheduleController.insertSchedule);
router.patch("/v2/:id", scheduleController.editSchedule);
router.delete("/v3/:id", scheduleController.deleteSchedule);

module.exports = router;
