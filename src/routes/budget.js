const express = require('express');
const router = express.Router();
const { getBudget, addBudget, editBudget, deleteBudget } = require('../DB/budgetquery'); 

const timeStampDate = require('../utils/functions')

router.get('/budget', async(req, res) => {
    try {
        const result = await getBudget();
        res.send(result);
    }catch(error) {
        console.log(error);
    }
});

router.post('/budget', async(req, res) => {
    const budget = req.body;
    budget.status = "active";
    budget.created_at = new Date();
    budget.updated_at = new Date();
    try {
        const result = await addBudget(budget);
        res.send(result.rows[0]);
    }catch(error) {
        console.log(error);
    }
});

router.put('/budget/:id', async(req, res) => {
    const id = req.params.id;
    const budget = req.body;
    budget.id = id;
    budget.updated_at = new Date();
    try {
        const result = await editBudget(budget);
        res.send(result.rows[0]);
    }catch(error) {
        console.log(error);
    }
});

router.delete('/budget/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteBudget(id);
        res.send(result.rows[0]);
    }catch(error) {
        console.log(error);
    }
});

module.exports = router;