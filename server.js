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
const User = require("./models/User");
app.post("/createUser", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role,
  });
  console.log("user created", user);
  res.json({ user: user });
});

app.post("/createUser", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const user = await User.create({
    username: username,
    email: email,
    password: password,
    role: role,
  });
  console.log("user created", user);
  res.json({ user: user });
});


// const apiRoutes = require("./routes/routes");
// app.use("/", apiRoutes);

app.get("/", (req, res) => {
  res.send("Running server");
});

//starting server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
