const express = require("express");
const app = express();
app.use(express.json());
// app.use(express.urlencoded());

const connectDB = require("./config/db");
connectDB();


const apiRoutes = require("./routes/routes");
app.use("/", apiRoutes);

const port = require("./config/dev").NEW_PORT;

app.get("/", (req, res) => {
  res.send("Running server");
});

app.listen(port, () => {
  console.log("server running on port 5000");
});
