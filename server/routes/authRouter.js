const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * User login route
 */
router.post("/login", authController.login, (req, res) => {
  return res.status(200).send(res.locals);
});

/**
 * User sign up route
 */
router.post("/signup", authController.signUp, (req, res) => {
  return res.status(200).send(res.locals);
});

/**
 * Route for authorization
 */
router.post("/cookie", authController.authorization, (req, res) => {
  return res.status(200).send(res.locals);
});

/**
 * Route for deletion of authorization jwt
 */
router.delete("/cookie", authController.destroyToken, (req, res) => {
  return res.status(200).send(res.locals);
});

module.exports = router;
