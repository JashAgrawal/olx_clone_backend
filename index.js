require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/index");
const routes = require("./Routes");
const app = express();

//connecting DB
connectDB();

//connecting middlewares
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors("*"));
app.use(express.json());
app.use(express.static("Public"));
app.use("/Auth", routes.userRoutes);
app.use("/Product", routes.productRoutes);
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
//starting server
app.listen(process.env.PORT, (err) => {
  if (err) console.log("Error While Starting Server");
  console.log(`Server Started at ${process.env.PORT}`);
});
