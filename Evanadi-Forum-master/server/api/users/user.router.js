const router = require("express").Router();

//importing auth middleware
const auth = require("../middleware/auth");

const {
  createUser,
  getUserById,
  login,
  getAllUsers,
} = require("./user.controller");

//route new user to be registered using createUser controller
router.post("/", createUser);

//route existing user to be verified using auth middleware and getUserById
router.get("/", auth, getUserById);

//route existing user to be login using login controller
router.post("/login", login);

//route existing user to be login using login controller
router.get("/allUsers", getAllUsers);

module.exports = router;
