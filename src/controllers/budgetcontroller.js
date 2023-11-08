const { pool } = require("../config/configDB.js");

const getBudget = async(req, res) => {
    const SQLQuery = {
        text: "SELECT * FROM budget ORDER BY id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            data: result.rows
        }); 
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

const getBudgetbyId = async(req, res) => {
    const id = req.params.id;
    const SQLQuery = {
        text: "SELECT * FROM budget WHERE id = $1;",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

const addBudget = async(req, res) => {
    const budget = req.body;
    const created_at = new Date();
    const updated_at = new Date();
    const SQLQuery = {
        text: "INSERT INTO budget (name, value, status, user_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
        values: [budget.name, budget.value, budget.status, budget.user_id, created_at, updated_at],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(201).send({
            code: 201,
            message: 'Budget added successfully',
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};


const editBudget = async(req, res) => {
    const id = req.params.id;
    const budget = req.body;
    const updated_at = new Date();
    const SQLQuery = {
        text: "UPDATE budget SET name = $1, value = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING *;",
        values: [budget.name, budget.value, budget.status, updated_at, id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            message: 'Budget updated successfully',
            data: result.rows
        }); 
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

const deleteBudget = async(req, res) => {
    const id = req.params.id;
    const SQLQuery = {
        text: "DELETE FROM budget WHERE id = $1 RETURNING *;",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            message: 'Budget deleted successfully',
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

module.exports = {
    getBudget,
    getBudgetbyId,
    addBudget,
    editBudget,
    deleteBudget,
};