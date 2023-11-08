const express = require('express');
const router = express.Router();

const { addCategory, getCategory, editCategory, deleteCategory, getCategorybyId } = require('../controllers/categorycontroller');

router.get('/category', getCategory);

router.post('/category', addCategory);

router.get('/category/:id', getCategorybyId);

router.put('/category/:id', editCategory);

router.delete('/category/:id', deleteCategory);

module.exports = router;