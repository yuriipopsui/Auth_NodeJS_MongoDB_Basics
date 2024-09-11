const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middlewares/authMiddleware.js");
const roleMiddleware = require("./middlewares/roleMiddleware.js");

router.post(
  "/registration",
  [
    check("userName", "User Name field not may be Empty").notEmpty(),
    check(
      "userPassword",
      "Password should contain between 4 and 8 symbols"
    ).isLength({ min: 4, max: 8 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;
