const express = require('express');
const router = express.Router();
const userController = require('../controllers').userController;
//get
router.post('/v1', userController.login); //login
router.post('/', userController.register); //register

module.exports = router;
