const express = require("express");
const router = express.Router();
const theaterController = require("../controllers").theaterController;
//get

router.get("/", theaterController.getAll);
router.get("/:id", theaterController.getById);
router.post("/v1", theaterController.insertTheater);
router.patch("/v2/:id", theaterController.editTheater);
router.delete("/v3/:id", theaterController.deleteTheater);

module.exports = router;
