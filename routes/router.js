const router = require("express").Router();
const multer = require("multer");
const {
  renderSignup,
  checkUser,
  verifyEmail,
  verified,
} = require("../controller/signup.controller");
const { renderLogin, login } = require("../controller/login.controller.js");
const { renderDashboard } = require("../controller/dashboard.controller");
const { fileUpload , sendKey , downloadfile } = require("../controller/fileUpload.controller");
const { isAuth } = require("../middlewear/jwtMiddlewear");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const extension = getExtension(file.originalname);
    const filenamee = extension.name + "-" + Date.now() + extension.ext;
    return cb(null, filenamee);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", (req, res) => {
  const token = req.cookies.JWTtoken;

  if (token) {
    return res.redirect("/dashboard");
  }
  res.render("index");
});

router.get("/signup", renderSignup);
router.post("/checkUser", checkUser);
router.post("/verifyEmail", verifyEmail);
router.get("/verified", verified);

router.get("/login", renderLogin);
router.post("/login", login);

router.get("/dashboard", isAuth, renderDashboard);
router.post("/dashboard", isAuth, upload.single("file"), fileUpload);
router.post("/sendKey",isAuth,sendKey);
router.post("/download",isAuth,downloadfile);

router.get("/logout", (req, res) => {
  res.clearCookie("JWTtoken");
  res.redirect("/");
});

function getExtension(fileName) {
  for (let i = fileName.length; i >= 0; i--) {
    if (fileName[i] == ".") {
      return {
        ext: fileName.slice(i, fileName.length),
        name: fileName.slice(0, i),
      };
    }
  }
}

/* */

module.exports = router;
