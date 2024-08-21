import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO).then(() => {
  console.log("MongoDB Connected");
}).catch((error) => {
  console.log("Error connecting to MongoDB!", error);
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});


