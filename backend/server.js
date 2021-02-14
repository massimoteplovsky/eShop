const path = require("path");
const express = require("express");
const cookieParser = require(`cookie-parser`);
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const cors = require("cors");
const connectDB = require("./config/db");
const {
  productsRouter,
  usersRouter,
  ordersRouter,
  configRouter,
  uploadRouter
} = require("./routes");
const {serverErrorHandler} = require("./middlewares");
const {
  DEFAULT_PORT,
  RoutePrefix
} = require("./consts");
const app = express();

require("dotenv").config();

connectDB();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());

// Cors policy
app.use(cors({
  origin: `http://localhost:3000`,
  credentials: true
}));
app.options(`*`, cors());

// Routes
app.use(RoutePrefix.PRODUCTS, productsRouter);
app.use(RoutePrefix.USERS, usersRouter);
app.use(RoutePrefix.ORDERS, ordersRouter);
app.use(RoutePrefix.CONFIG, configRouter);
app.use(RoutePrefix.UPLOAD, uploadRouter);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Middlewares
app.use(serverErrorHandler);

// Server init
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));
