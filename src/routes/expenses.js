const express = require('express');
const router = express.Router();
const { getExpensesByBudgetId, getAllExpensesData, addExpenses, editExpenses, deleteExpense } = require('../controllers/expensescontroller');
const { authToken } = require('../middleware/authMiddleware')

router.get('/expenses', authToken, getAllExpensesData);

router.post('/expenses', authToken, addExpenses);

router.get('/expenses/:id', authToken, getExpensesByBudgetId);

router.put('/expenses/:id', authToken, editExpenses);

router.delete('/expenses/:id', authToken, deleteExpense);

module.exports = router;