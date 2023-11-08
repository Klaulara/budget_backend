const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controllers/userController.js");

router.get("/register", getUsers);

router.post('/register', addUser);

module.exports = router;