const express = require('express');
const router = express.Router();
const { getExpenses, addExpenses, editExpenses, deleteExpense } = require('../DB/expensesquery');

router.get('/expenses', async(req, res) => {
    try {
        const result = await getExpenses();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.post('/expenses', async(req, res) => {
    const expenses = req.body;
    expenses.created_at = new Date();
    expenses.updated_at = new Date();
    try {
        const result = await addExpenses(expenses);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

router.put('/expenses/:id', async(req, res) => {
    const id = req.params.id;
    const expenses = req.body;
    expenses.id = id;
    expenses.updated_at = new Date();
    try {
        const result = await editExpenses(expenses);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/expenses/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteExpense(id);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;