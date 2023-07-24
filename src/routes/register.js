const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controllers/userController.js");
const bcrypt = require("bcrypt");

router.get("/register", async (req, res) => {
    try {
        const result = await getUsers();
        res.status(200).send({
            code: 200,
            data: result,
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500,
        });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name,
        email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
    };
    try {
        const result = await addUser(newUser);
        res.status(201).send({
            code: 201,
            message: "Successfully registered new user",
            data: result.rows[0],
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

module.exports = router;