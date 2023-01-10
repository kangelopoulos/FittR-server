const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Login route - post request for security purposes
 * req.body - email (str), password (str)
 * middleware - 
 * res.locals - display name (str), username (str)
 */
router.post('/login', 
  authController.login,
  (req, res) => {
    return res.send(res.locals);
});

/**
 * Sign up route 
 * req.body - email (str), password (str), display_name (str, optional)
 * middleware - authController.signUp
 * res.locals - display name (str), username (str)
 */
router.post('/signup', 
  authController.signUp, 
  (req, res) => {
    return res.status(200).send(res.locals);
});

/**
 * Update user route
 * req.body - email (str), password (str), display_name (str, optional), user_id (number)
 * middleware -
 * res.locals - n/a
 */
 router.patch('/', (req, res) => {
  return res.send(res.locals);
});

/**
 * Update user route
 * req.body - user_id
 * middleware -
 * res.locals - n/a
 */
 router.delete('/', (req, res) => {
  return res.send(res.locals);
});

module.exports = router;