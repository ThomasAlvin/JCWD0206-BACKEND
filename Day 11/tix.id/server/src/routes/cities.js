const express = require("express");
const router = express.Router();
const cityController = require("../controllers").cityController;
//get

router.get("/", cityController.getAll);
router.get("/:id", cityController.getById);
router.post("/v1", cityController.insertCity);
router.patch("/v2/:id", cityController.editCity);
router.delete("/v3/:id", cityController.deleteCity);

module.exports = router;
