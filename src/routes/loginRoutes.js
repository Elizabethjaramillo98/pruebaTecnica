const express = require('express');
const router = express.Router();
const LoginController = require("../controllers/login");

router.post('/Login', LoginController.Login);

module.exports = router;