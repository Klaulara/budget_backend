const express = require('express');
const router = express.Router();
const { getBudget, getBudgetbyId, addBudget, editBudget, deleteBudget } = require('../controllers/budgetcontroller'); 
const { authToken } = require('../middleware/authMiddleware')

router.get('/budget', authToken, getBudget);

router.post('/budget', authToken, addBudget);

router.get('/budget/:id', authToken, getBudgetbyId);

router.put('/budget/:id', authToken, editBudget);

router.delete('/budget/:id', authToken,  deleteBudget);

module.exports = router;