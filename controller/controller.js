const User = require("../models/User");
const Upload = require("../models/Uploads");
const jwt = require("jsonwebtoken");

module.exports.createUser = async (req, res) => {
  try {
    const { email, password, role, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
      role: role,
    });

    console.log("user created", user);
    res.json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.getCredentials = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const credentials = await Upload.find({ user_email: email }).exec();
    res.json({
      message: "Credentials found",
      credentials: credentials,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.createStuCredentials = async (req, res, next) => {
  try {
    const email = req.body.email;
    const category = req.body.category;
    const Achievement_Type = req.body.Achievement_Type;
    const Expiry_Date = req.body.Expiry_Date;
    const Achievement_Title = req.body.Achievement_Title;
    const Achievement_Details = req.body.Achievement_Details;
    const files = req.body.files;
    const Student_Name = req.body.Student_Name;
    const Student_Registration_No = req.body.Student_Registration_No;
    const Student_Branch = req.body.Student_Branch;
    const Student_Batch = req.body.Student_Batch;

    const credential = await Upload.create({
      user_email: email,
      category: category,
      Achievement_Type: Achievement_Type,
      Expiry_Date: Expiry_Date,
      Achievement_Title: Achievement_Title,
      Achievement_Details: Achievement_Details,
      files: files,
      Student_Name: Student_Name,
      Student_Registration_No: Student_Registration_No,
      Student_Branch: Student_Branch,
      Student_Batch: Student_Batch,
    });
    console.log("student credential created", credential);
    res.json({ credential: credential });
  } catch (error) {
    console.error("Error uploding student credential:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.createFacCredentials = async (req, res, next) => {
  try {
    const email = req.body.email;
    const category = req.body.category;
    const Achievement_Type = req.body.Achievement_Type;
    const Expiry_Date = req.body.Expiry_Date;
    const Achievement_Title = req.body.Achievement_Title;
    const Achievement_Details = req.body.Achievement_Details;
    const files = req.body.files;

    const credential = await Upload.create({
      user_email: email,
      category: category,
      Achievement_Type: Achievement_Type,
      Expiry_Date: Expiry_Date,
      Achievement_Title: Achievement_Title,
      Achievement_Details: Achievement_Details,
      files: files,
    });
    console.log("Faculty Credential created", credential);
    res.json({ credential: credential });
  } catch (error) {
    console.error("Error uploding faculty credential:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function generateToken(user) {
  const payload = {
    email: user.email,
    role: user.role,
    name: user.username,
  };
  return jwt.sign(payload, "your-secret-key", { expiresIn: "1h" });
}

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = user.matchPassword(password);

    // Check if the password is valid
    if (isPasswordValid) {
      const token = generateToken(user);
      // Send token to the frontend
      res.json({ message: "Login successful", token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.logoutUser = async (req, res, next) => {};

module.exports.dwdCredentials = async (req, res, next) => {};
module.exports.dwdCurrCredential = async (req, res, next) => {};

// app.post("/register", async (req, res) => {
//   try {
//     const { email, password, role, username } = req.body;
//     // Check if user with the same email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already in use" });
//     }

//     // Create a new user
//     const newUser = await User.create({
//       username,
//       email,
//       password,
//       role,
//     });

//     res.json({ message: "User registered successfully", user: newUser });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });

//     // Check if the user exists
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Compare the provided password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     // Check if the password is valid
//     if (isPasswordValid) {
//       const token = generateToken(user);
//       // Send token to the frontend
//       res.json({ message: "Login successful", token });
//     } else {
//       res.status(401).json({ error: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const storage = multer.memoryStorage(); // Store files in memory

// const upload = multer({ storage });

// app.post("/upload-data-faculty", upload.array("files"), async (req, res) => {
//   // Extract form data from the request
//   const {
//     achievement_type,
//     exp_date,
//     achievement_details,
//     achievement_title,
//     user_email,
//   } = req.body;
//   const promises = req.files.map((file) => {
//     return new Promise((resolve, reject) => {
//       const buffer = Buffer.from(file.buffer);
//       const filename =
//         crypto.randomBytes(16).toString("hex") +
//         path.extname(file.originalname);

//       // Create a write stream to MongoDB
//       const uploadStream = bucket.openUploadStream(filename, {
//         metadata: {
//           achievement_type,
//           exp_date,
//           achievement_details,
//           achievement_title,
//           user_email,
//         },
//       });

//       uploadStream.write(buffer);
//       uploadStream.end(() => {
//         resolve(filename);
//       });
//     });
//   });

//   Promise.all(promises)
//     .then((savedFiles) => {
//       // Now you can save 'name' and 'savedFiles' to MongoDB using Mongoose or your preferred MongoDB library

//       res.status(200).json({
//         message: "Files uploaded successfully!",
//         filenames: savedFiles,
//       });
//     })
//     .catch((error) => {
//       console.error("Error storing files in MongoDB:", error);
//       res.status(500).json({ message: "Internal server error" });
//     });
// });
// const port = 8000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
