const { pool } = require("../config/configDB.js");

const getExpenses = async () => {
    const SQLQuery = {
        text: "SELECT * FROM expenses ORDER BY id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const getExpensesByBudgetId = async (id) => {
    const SQLQuery = {
        text: "SELECT * FROM expenses WHERE budget_id = $1;",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllExpensesData = async() => {
    const SQLQuery = {
        text: "SELECT expenses.id, expenses.name, expenses.value, expenses.created_at as expenses_date, budget.name as budget_name, category.name as category_name from expenses join budget on expenses.budget_id = budget.id join category on expenses.category_id = category.id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
}

const addExpenses = async (expenses) => {
    const SQLQuery = {
        text: "INSERT INTO expenses (budget_id, name, value, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
        values: [expenses.budget_id, expenses.name, expenses.value, expenses.category_id, expenses.created_at, expenses.updated_at],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};


const editExpenses = async (expenses) => {
    const SQLQuery = {
        text: "UPDATE expenses SET budget_id = $1, name = $2, value = $3, category_id = $4, updated_at = $5 WHERE id = $6 RETURNING *;",
        values: [expenses.budget_id, expenses.name, expenses.value, expenses.category_id, expenses.updated_at, expenses.id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteExpense = async (id) => {
    const SQLQuery = {
        text: "DELETE FROM expenses WHERE id = $1 RETURNING *;",
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
    getExpenses,
    getExpensesByBudgetId,
    getAllExpensesData,
    addExpenses,
    editExpenses,
    deleteExpense,
};