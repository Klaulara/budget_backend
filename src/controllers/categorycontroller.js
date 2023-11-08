const { pool } = require("../config/configDB.js");

const getCategory = async(req, res) => {
    const SQLQuery = {
        text: "SELECT * FROM category ORDER BY id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

const getCategorybyId = async(req, res) => {
    const id = req.params.id;
    const SQLQuery = {
        text: "SELECT * FROM category WHERE id = $1;",
        values: [id]
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
}

const addCategory = async(req, res) => {
    const category = req.body;
    const SQLQuery = {
        text: "INSERT INTO category (name, image) VALUES ($1, $2) RETURNING *;",
        values: [category.name, category.image],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(201).send({
            code: 201,
            message: 'Category added successfully',
            data: result
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

const editCategory = async(req, res) => {
    const id = req.params.id;
    const category = req.body;
    const SQLQuery = {
        text: "UPDATE category SET name = $1, image = $2 WHERE id = $3 RETURNING *;",
        values: [category.name, category.image, id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            message: 'Category updated successfully',
            data: result
        }); 
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

const deleteCategory = async(req, res) => {
    const id = req.params.id;
    const SQLQuery = {
        text: "DELETE FROM category WHERE id = $1 RETURNING *;",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return res.status(200).send({
            code: 200,
            message: 'Category deleted successfully',
            data: result
        });
    } catch (error) {
        return res.status(500).send({
            error: `Something went wrong...${error}`,
            code: 500
        })
    }
};

module.exports = {
    getCategory,
    getCategorybyId,
    addCategory,
    editCategory,
    deleteCategory,
};