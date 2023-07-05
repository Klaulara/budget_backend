const express = require('express');
const router = express.Router();

const { addCategory, getCategory, editCategory, deleteCategory } = require('../DB/categoryquery');

router.get('/category', async(req, res) => {
    try {
        const result = await getCategory();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.post('/category', async (req, res) => {
    const category = req.body;
    try {
        const result = await addCategory(category);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

router.put('/category/:id', async (req, res) => {
    const id = req.params.id;
    const category = req.body;
    category.id = id;
    try {
        const result = await editCategory(category);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/category/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteCategory(id);
        res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;