const { pool } = require("../config/configDB.js");
const bcrypt = require("bcrypt");

const getUsers =  async (req, res) => {
    const SQLQuery = {
        text: "SELECT * FROM users ORDER BY id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        res.status(200).send({
            code: 200,
            data: result.rows,
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500,
        });
    }
};

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    const created_at = new Date();
    const updated_at = new Date();
    if(!name || !email || !password) {
        return res.status(500).send({
            error: "Please provide all required fields!",
            code: 500
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailQuery = {
        text: "SELECT * FROM users WHERE email = $1;",
        values: [email],
    };
    const duplicate = await pool.query(emailQuery);
    if(duplicate.rows.length > 0) {
        return res.status(500).send({
            error: "Email already registered!",
            code: 500
        })
    }
    const SQLQuery = {
        text: "INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        values: [name, email, hashedPassword, created_at, updated_at],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(201).send({
            code: 201,
            message: "Successfully registered new user",
            data: result.rows[0],
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
}

module.exports = {
    getUsers,
    addUser,
}