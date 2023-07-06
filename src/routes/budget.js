const express = require('express');
const router = express.Router();
const { getBudget, addBudget, editBudget, deleteBudget } = require('../DB/budgetquery'); 

const timeStampDate = require('../utils/functions')

router.get('/budget', async(req, res) => {
    try {
        const result = await getBudget();
        res.send(result);
    }catch(error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.post('/budget', async(req, res) => {
    const budget = req.body;
    budget.created_at = new Date();
    budget.updated_at = new Date();
    try {
        const result = await addBudget(budget);
        res.send({
            code: 200,
            message: 'Budget added successfully',
        });
    }catch(error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.put('/budget/:id', async(req, res) => {
    const id = req.params.id;
    const budget = req.body;
    budget.id = id;
    budget.updated_at = new Date();
    try {
        const result = await editBudget(budget);
        res.send({
            code: 200,
            message: 'Budget updated successfully',
        });
    }catch(error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.delete('/budget/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteBudget(id);
        res.send({
            code: 200,
            message: 'Budget deleted successfully',
        });
    }catch(error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

module.exports = router;