const express = require("express");
const app = express();

const connectDB = require("./config/db");
connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/api", (req, res) => {
  res.send("hello world");
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
