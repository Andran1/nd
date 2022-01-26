const Router = require("express");
const router = new Router();

const userRouter = require("./UserRoutes");
const tasksRouter = require("./TaskRoutes");

router.use("/user", userRouter);
router.use("/tasks", tasksRouter);

module.exports = router;
