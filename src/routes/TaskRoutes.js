const Router = require("express");
const passport = require("../../utils/passport");
const TaskController = require("../controllers/TaskController");
const router = new Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TaskController.index
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  TaskController.create
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  TaskController.getTaskById
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  TaskController.removeAllTasks
);

module.exports = router;
