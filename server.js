const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions.js');
require('dotenv').config();

const port = process.env.PORT;

const budget = require('./src/routes/budget');
const expenses = require('./src/routes/expenses');
const category = require('./src/routes/category');

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/api/v1', budget); 
app.use('/api/v1', expenses);
app.use('/api/v1', category);

app.listen(port, () => console.log(`Listening on port ${port}!`));