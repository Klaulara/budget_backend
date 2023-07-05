const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

const budget = require('./src/routes/budget');
const expenses = require('./src/routes/expenses');
const category = require('./src/routes/category');

app.use(express.json());
app.use('/api/v1', budget);
app.use('/api/v1', expenses);
app.use('/api/v1', category);

app.listen(port, () => console.log(`Listening on port ${port}!`));