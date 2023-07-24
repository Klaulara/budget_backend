const { pool } = require("../config/configDB.js");
const bcrypt = require("bcrypt");

const handleLogin = async (user) => {
    const { email, password } = user;
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
        return result.rows[0];
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    handleLogin,
}