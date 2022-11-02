require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");

const cors = require("cors");

// connect DB
const connectDB = require("./src/db/connect");

// routers
const productsRouter = require("./src/routes/products");
const commentsRouter = require("./src/routes/comments");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

// routes
app.use("/api/products", productsRouter);
app.use("/api/comments", commentsRouter);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

// ERROR HANDLER
app.use(errorHandler);

/**
 *
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function errorHandler(err, req, res, next) {
  console.log(err.message);
  res.status(500).send({ message: "Server error" });
}
