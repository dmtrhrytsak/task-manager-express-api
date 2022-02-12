const express = require('express');
const tasksRouter = require('./routes/tasks.route');
const connectDB = require('./db/connect');
const notFound = require('./middlewares/not-found.middelware');
const errorHandler = require('./middlewares/error-handler.middleware');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/v1/tasks', tasksRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
