const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const DB_URL = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use('/auth', authRouter);


const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
  } catch (error) {
    console.log(error.message);
  }
};

start();