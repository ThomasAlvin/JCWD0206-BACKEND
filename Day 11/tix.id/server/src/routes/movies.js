const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;
//get

router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);
router.post("/v1", movieController.insertMovie);
router.patch("/v2/:id", movieController.editMovie);
router.delete("/v3/:id", movieController.deleteMovie);

module.exports = router;
