const express = require('express');
const router = express.Router();

const { addCategory, getCategory, editCategory, deleteCategory } = require('../DB/categoryquery');

router.get('/category', async(req, res) => {
    try {
        const result = await getCategory();
        res.send(result);
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.post('/category', async (req, res) => {
    const category = req.body;
    try {
        const result = await addCategory(category);
        res.send({
            code: 200,
            message: 'Category added successfully',
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.put('/category/:id', async (req, res) => {
    const id = req.params.id;
    const category = req.body;
    category.id = id;
    try {
        const result = await editCategory(category);
        res.send({
            code: 200,
            message: 'Category updated successfully',
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

router.delete('/category/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteCategory(id);
        res.send({
            code: 200,
            message: 'Category deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
});

module.exports = router;