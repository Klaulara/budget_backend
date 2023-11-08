const { pool } = require("../config/configDB.js");

const getExpenses = async(req, res) => {
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

const getExpensesByBudgetId = async(req, res) => {
    const id = req.params.id;
    const SQLQuery = {
        text: "SELECT * FROM expenses WHERE budget_id = $1;",
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

const getAllExpensesData = async(req, res) => {
    const SQLQuery = {
        text: "SELECT expenses.id, expenses.name, expenses.value, expenses.created_at as expenses_date, budget.name as budget_name, category.name as category_name from expenses join budget on expenses.budget_id = budget.id join category on expenses.category_id = category.id;",
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
}

const addExpenses = async(req, res) => {
    const expenses = req.body;
    const created_at = new Date();
    const updated_at = new Date();
    const SQLQuery = {
        text: "INSERT INTO expenses (budget_id, name, value, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
        values: [expenses.budget_id, expenses.name, expenses.value, expenses.category_id, created_at, updated_at],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(201).send({
            code: 201,
            message: 'Expenses added successfully',
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};


const editExpenses = async(req, res) => {
    const id = req.params.id;
    const expenses = req.body;
    const updated_at = new Date();
    const SQLQuery = {
        text: "UPDATE expenses SET budget_id = $1, name = $2, value = $3, category_id = $4, updated_at = $5 WHERE id = $6 RETURNING *;",
        values: [expenses.budget_id, expenses.name, expenses.value, expenses.category_id, updated_at, id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            message: 'Expenses updated successfully',
            data: result.rows
        }); 
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

const deleteExpense = async(req, res) => {
    const id = req.params.id;
    const SQLQuery = {
        text: "DELETE FROM expenses WHERE id = $1 RETURNING *;",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            message: 'Expenses deleted successfully',
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
    getExpenses,
    getExpensesByBudgetId,
    getAllExpensesData,
    addExpenses,
    editExpenses,
    deleteExpense,
};