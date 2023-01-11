const PORT = 3000;
const express = require("express");
const path = require("path");
const authRouter = require("./routes/authRouter");
const weightRouter = require("./routes/weightRouter");
const cookieParser = require("cookie-parser");

const app = express();

/**
 * Handle parsing request body
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/**
 * Routes
 */
app.use("/auth", authRouter);
app.use("/weight", weightRouter);

/**
 * Handle faulty requests
 */
app.use((req, res) => res.sendStatus(404));

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * listening on port - 3000
 */
app.listen(PORT, () => console.log(`Server now running on port ${PORT}`));

module.exports = app;
