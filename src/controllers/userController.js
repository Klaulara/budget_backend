const { pool } = require("../config/configDB.js");

const getUsers = async () => {
    const SQLQuery = {
        text: "SELECT * FROM users ORDER BY id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const addUser = async (user) => {
    const { name, email, password } = user;
    if(!name || !email || !password) {
        throw new Error("Please provide all required fields!");
    }
    const emailQuery = {
        text: "SELECT * FROM users WHERE email = $1;",
        values: [email],
    };
    const duplicate = await pool.query(emailQuery);
    if(duplicate.rows.length > 0) {
        throw new Error("Email already registered!");
    }
    const SQLQuery = {
        text: "INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        values: [user.name, user.email, user.password, user.created_at, user.updated_at],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getUsers,
    addUser,
}