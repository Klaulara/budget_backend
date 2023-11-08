const express = require('express');
const router = express.Router();
const { getExpensesByBudgetId, getAllExpensesData, addExpenses, editExpenses, deleteExpense } = require('../controllers/expensescontroller');

router.get('/expenses', getAllExpensesData);

router.post('/expenses', addExpenses);

router.get('/expenses/:id', getExpensesByBudgetId);

router.put('/expenses/:id', editExpenses);

router.delete('/expenses/:id', deleteExpense);

module.exports = router;