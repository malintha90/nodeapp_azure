require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const DBConnection = require('./DBConnection/Connection');
const route = require('./src/Routes');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
MONGO_URL = "mongodb+srv://malinthakumarage:malintha123@cluster0.3xjpjle.mongodb.net/ChatApp?retryWrites=true&w=majority&appName=Cluster0"
// DBConnection(process.env.MONGO_URL);
DBConnection(MONGO_URL);

app.use('/api/', route);


app.listen(5000, () => {
    console.log(`Server running on ${port}`);
})

module.exports = app;
