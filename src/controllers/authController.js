const { pool } = require("../config/configDB.js");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        throw new Error("Please provide all required fields!");
    }
    const foundUser = await pool.query("SELECT * FROM users WHERE email = $1;", [email]);
    if(!foundUser) {
        throw new Error("Email not registered!");
    }
    const isMatch = await bcrypt.compare(password, foundUser.rows[0].password);
    if(!isMatch) {
        throw new Error("Wrong password!");
    }
    const SQLQuery = {
        text: "SELECT * FROM users WHERE email = $1;",
        values: [email],
    };
    try {
        const result = await pool.query(SQLQuery);
        res.status(200).send({
            code: 200,
            message: "Successfully logged in",
            data: result.rows[0],
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
}

module.exports = {
    handleLogin,
}