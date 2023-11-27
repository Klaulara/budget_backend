const express = require('express');
const router = express.Router();

const { addCategory, getCategory, editCategory, deleteCategory, getCategorybyId } = require('../controllers/categorycontroller');
const { authToken } = require('../middleware/authMiddleware')

router.get('/category', authToken, getCategory);

router.post('/category', authToken, addCategory);

router.get('/category/:id', authToken, getCategorybyId);

router.put('/category/:id', authToken, editCategory);

router.delete('/category/:id', authToken, deleteCategory);

module.exports = router;