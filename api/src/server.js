const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// eslint-disable-next-line no-unused-vars
const colors = require("colors");
const dotenv = require("dotenv").config();

if (dotenv.error) {
  if (!process.env.DOCKER) {
    console.error(
      `Failed to load environment variables`.red.bold,
      dotenv.error
    );
  }
  console.info(`Using default settings`.yellow.bold);
} else {
  console.info(`Using settings from .env file`.yellow.bold);
}

// SERVER PORT
const PORT = process.env.SERVER_PORT || 5000;

// Initialize Application
const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to the safepal USSD api!" });
});

app.listen(
  PORT,
  console.info(
    `API Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold.underline
  )
);
