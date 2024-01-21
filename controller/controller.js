module.exports.registerUser=asyncHandler(async (req, res, next) => {})




app.post("/register", async (req, res) => {
    try {
      const { email, password, role, username } = req.body;
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
  
      // Create a new user
      const newUser = await User.create({
        username,
        email,
        password,
        role,
      });
  
      res.json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
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
  });
  
  const storage = multer.memoryStorage(); // Store files in memory
  
  const upload = multer({ storage });
  
  app.post("/upload-data-faculty", upload.array("files"), async (req, res) => {
    // Extract form data from the request
    const {
      achievement_type,
      exp_date,
      achievement_details,
      achievement_title,
      user_email,
    } = req.body;
    const promises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const buffer = Buffer.from(file.buffer);
        const filename =
          crypto.randomBytes(16).toString("hex") +
          path.extname(file.originalname);
  
        // Create a write stream to MongoDB
        const uploadStream = bucket.openUploadStream(filename, {
          metadata: {
            achievement_type,
            exp_date,
            achievement_details,
            achievement_title,
            user_email,
          },
        });
  
        uploadStream.write(buffer);
        uploadStream.end(() => {
          resolve(filename);
        });
      });
    });
  
    Promise.all(promises)
      .then((savedFiles) => {
        // Now you can save 'name' and 'savedFiles' to MongoDB using Mongoose or your preferred MongoDB library
  
        res
          .status(200)
          .json({
            message: "Files uploaded successfully!",
            filenames: savedFiles,
          });
      })
      .catch((error) => {
        console.error("Error storing files in MongoDB:", error);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  const port = 8000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  