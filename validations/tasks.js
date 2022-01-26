const { body } = require("express-validator");

const tasksValidations = [
  body("name", "Please write name.")
    .isString()
    .withMessage("Wrong email type.")
    .isLength({ min: 2, max: 40 })
    .withMessage("Wrong email min length > min 10."),

  body("owner", "Please write owner.").isString(),

  body("password", "Please write a password.")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Wrong password length > min 8.")
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Passwords does not match.");
      } else {
        return value;
      }
    }),
];

module.exports = tasksValidations;
