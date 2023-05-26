const express = require("express");
const { fileUploader } = require("../middleware/multer");
const router = express.Router();
const movieController = require("../controllers").movieController;
//get

router.get("/", movieController.getAll);
router.get("/:id", movieController.getById);
router.post(
  "/v1",
  fileUploader({
    destinationFolder: "movie",
  }).single("img_url"),
  movieController.insertMovie
);
router.patch("/v2/:id", movieController.editMovie);
router.delete("/v3/:id", movieController.deleteMovie);

module.exports = router;
