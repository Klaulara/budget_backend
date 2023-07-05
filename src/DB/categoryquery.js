const { pool } = require("./config");

const getCategory = async () => {
    const SQLQuery = {
        text: "SELECT * FROM category ORDER BY id;",
    };
    try {
        const result = await pool.query(SQLQuery);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
};

const addCategory = async (category) => {
    const SQLQuery = {
        text: "INSERT INTO category (id, name, image) VALUES ($1, $2, $3) RETURNING *;",
        values: [category.id, category.name, category.image],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const editCategory = async (category) => {
    const SQLQuery = {
        text: "UPDATE category SET name = $1, image = $2 WHERE id = $3 RETURNING *;",
        values: [category.name, category.image, category.id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteCategory = async (id) => {
    const SQLQuery = {
        text: "DELETE FROM category WHERE id = $1 RETURNING *;",
        values: [id],
    };
    try {
        const result = await pool.query(SQLQuery);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getCategory,
    addCategory,
    editCategory,
    deleteCategory,
};