const Router = require("express");
const passport = require("../../utils/passport");
const registerValidations = require("../../validations/register");
const UserController = require("../controllers/UserController");
const router = new Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.index
);
router.post("/register", registerValidations, UserController.register);
router.post("/login", passport.authenticate("local"), UserController.login);

module.exports = router;
