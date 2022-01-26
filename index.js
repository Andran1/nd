require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const router = require("./src/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
  })
);

app.use("/api", router);

const start = async () => {
  try {
    await db();

    app.listen(process.env.PORT || 3000, () => {
      console.log("server running");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
