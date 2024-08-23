// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();
// import userRouter from './routes/user.routes.js'
// import authRouter from './routes/auth.route.js';

// const app = express();
// app.use(express.json())
// const port = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO).then(() => {
//   console.log("MongoDB Connected");
// }).catch((error) => {
//   console.log("Error connecting to MongoDB!", error);
// });

// app.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// });

// app.use('/api/user' , userRouter)
// app.use('/api/auth' , authRouter)

// app.use( (error , request , response , next)=>{
//   const statusCode = error.statusCode || 500 
//   const message = error.message || "Internal server Error"
//   response.status(statusCode).json({
//     success: false,
//     statusCode,
//     message
//   })
// })


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB!", error);
  });

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server Error";
  response.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

