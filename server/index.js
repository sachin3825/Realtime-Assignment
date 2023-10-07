const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const EmployeeRoutes = require("./routes/employee");
const database = require("./config/database");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// DB connect
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    tempFileDir: "/temp",
  })
);

// routes
app.use("/api/v1/employee", EmployeeRoutes);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
