const { pool } = require("./config");

const getBudget = async () => {
    const SQLQuery = {
        text: "SELECT * FROM budget ORDER BY id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const addBudget = async (budget) => {
    const SQLQuery = {
        text: "INSERT INTO budget (name, value, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        values: [budget.name, budget.value, budget.status, budget.created_at, budget.updated_at],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};


const editBudget = async (budget) => {
    const SQLQuery = {
        text: "UPDATE budget SET name = $1, value = $2, status = $3, updated_at = $4 WHERE id = $5 RETURNING *;",
        values: [budget.name, budget.value, budget.status, budget.updated_at, budget.id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteBudget = async (id) => {
    const SQLQuery = {
        text: "DELETE FROM budget WHERE id = $1 RETURNING *;",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getBudget,
    addBudget,
    editBudget,
    deleteBudget,
};