const router = require('express').Router();
const { checkEmail, checkNumber } = require("../middlewares/checkAuth");
const { getUsers } = require("../services/apiUsers");

router.post('/', checkEmail, checkNumber, getUsers);

module.exports = {
  router
}
