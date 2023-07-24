const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controllers/authController.js");

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = {
        email,
        password,
    };
    try {
        const result = await handleLogin(user);
        res.status(200).send({
            code: 200,
            message: "Successfully logged in",
            data: result,
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

module.exports = router;