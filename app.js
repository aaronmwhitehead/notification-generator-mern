// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
require("dotenv").config()
const path = require("path");

// routes
const emails = require('./routes/api/emails');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));
app.use('/', emails);
app.use(express.static(path.resolve(__dirname, "./client/build")));

// app.get('/:id', (req, res) => emails.getExisting(req, res));
// app.post('/:id', (req, res) => emails.updateEmail(req, res))
// app.post('/', (req, res) => emails.saveEmail(req, res))

app.get("*", function (request, response) {
  console.log('get')
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// use Routes
// app.use('/api/emails', emails);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
