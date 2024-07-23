const express = require('express');
const connectDB = require('./config');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();


connectDB();


app.use(bodyParser.json());

app.use(cors()); //cores



app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 3080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
