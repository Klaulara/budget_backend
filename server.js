const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const port = process.env.PORT;

const budget = require('./src/routes/budget');
const expenses = require('./src/routes/expenses');
const category = require('./src/routes/category');

const whitelist = ['http://localhost:8080', 'http://localhost:3002']
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }   
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/api/v1', budget); 
app.use('/api/v1', expenses);
app.use('/api/v1', category);

app.listen(port, () => console.log(`Listening on port ${port}!`));