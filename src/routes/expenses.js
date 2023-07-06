const express = require('express');
const router = express.Router();
const { getExpensesByBudgetId, getAllExpensesData, addExpenses, editExpenses, deleteExpense } = require('../DB/expensesquery');

router.get('/expenses', async(req, res) => {
    try {
        const result = await getAllExpensesData();
        res.send(result);
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.get('/expenses/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await getExpensesByBudgetId(id);
        res.send(result);
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.post('/expenses', async(req, res) => {
    const expenses = req.body;
    expenses.created_at = new Date();
    expenses.updated_at = new Date();
    try {
        const result = await addExpenses(expenses);
        res.send({
            code: 200,
            message: 'Expenses added successfully',
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.put('/expenses/:id', async(req, res) => {
    const id = req.params.id;
    const expenses = req.body;
    expenses.id = id;
    expenses.updated_at = new Date();
    try {
        const result = await editExpenses(expenses);
        res.send({
            code: 200,
            message: 'Expenses updated successfully',
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.delete('/expenses/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteExpense(id);
        res.send({
            code: 200,
            message: 'Expenses deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

module.exports = router;