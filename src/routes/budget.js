const express = require('express');
const router = express.Router();
const { getBudget, getBudgetbyId, addBudget, editBudget, deleteBudget } = require('../controllers/budgetcontroller'); 

router.get('/budget', getBudget);

router.post('/budget', addBudget);

router.get('/budget/:id', getBudgetbyId);

router.put('/budget/:id', editBudget);

router.delete('/budget/:id',  deleteBudget);

module.exports = router;