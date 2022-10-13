const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Import routes
const authRouter = require('./routers/auth.js')

// Config dotenv
dotenv.config()

// Connect to DB
mongoose.connect(process.env.CONNECT_DB, { useNewUrlParser: true }, () => {
  console.log('connected to db')
})

// Route middlewares
app.use(express.json())
app.use('/api/auth', authRouter)

// Start server
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started on port: ${process.env.SERVER_PORT}`)
})
