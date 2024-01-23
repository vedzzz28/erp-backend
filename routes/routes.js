const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  createUser,
  loginUser,
  logoutUser,
  getCredentials,
  dwdCredentials,
  dwdCurrCredential,
  createFacCredentials,
  createStuCredentials,
  checkAuth,
} = require("../controller/controller");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/check-auth", requireAuth, checkAuth);

router.get("/getCredentials", getCredentials);
// router.get("/dwdCredentials", dwdCredentials);
// router.get("/dwdCurrCredential", dwdCurrCredential);
router.post("/createStuCredentials", createStuCredentials);
router.post("/createFacCredentials", createFacCredentials);

module.exports = router;
