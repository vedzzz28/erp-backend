const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  logoutUser,
  getCredentials,
  dwdCredentials,
  dwdCurrCredential,
  createFacCredentials,
  createStuCredentials,
} = require("../controller/controller");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/getCredentials", getCredentials);
router.get("/dwdCredentials", dwdCredentials);
router.get("/dwdCurrCredential", dwdCurrCredential);
router.post("/createStuCredentials", createStuCredentials);
router.post("/createFacCredentials", createFacCredentials);

module.exports = router;

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
