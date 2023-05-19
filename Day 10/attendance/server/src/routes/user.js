const express = require('express');
const router = express.Router();
const userController = require('../controllers').userController;
//get
router.post('/v1', userController.login); //login
router.post('/v2', userController.loginV2); //login

router.post('/', userController.register); //register
router.get('/companies', userController.getCompanies); //register
router.get('/token', userController.getByToken);
router.get('/token2', userController.getByTokenV2);

module.exports = router;
