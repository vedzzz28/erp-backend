const express = require("express");
const app = express();
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
app.use(express.json());

//connnect to DB
const connectDB = require("./config/db");
connectDB();

//Routes
const apiRoutes = require("./routes/routes");
app.use("/", apiRoutes);

app.get("/", (req, res) => {
  res.send("Running server");
});

//starting server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
