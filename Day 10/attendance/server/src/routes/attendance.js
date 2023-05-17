const express = require('express');
const router = express.Router();
// const branchController = require('../controllers').branchController;
//get
router.get('/', branchController.getAll);
router.post('/', branchController.countAll);

module.exports = router;
