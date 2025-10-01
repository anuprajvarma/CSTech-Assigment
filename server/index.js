const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./router/auth");

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins, // Allow Next.js frontend to access this API
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://anupraj1854_db_user:Im6RK27CYz4n9qWU@cluster0.36zeulp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(console.log("connection stablished"));

app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
