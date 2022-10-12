const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Config dotenv
dotenv.config();

// Start server
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port: ${process.env.SERVER_PORT}`);
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to DB!');
});


// Import routes
const authRouter = require('./routers/auth.js');

// Route middlewares
app.use(express.json());
app.use('/api/auth', authRouter);
