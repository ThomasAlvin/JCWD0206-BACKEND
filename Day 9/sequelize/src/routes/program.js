const express = require('express');
const router = express.Router();
const programController = require('../controllers').programController;

router.get('/', programController.getAll);
router.post('/', programController.insertProgramV1, programController.getAll);

module.exports = router;
