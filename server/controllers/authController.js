const db = require('../models/postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {};

/**
 * Sign up controller
 */
authController.signUp = async (req, res, next) => {
  const { email, password, displayName } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const q = `INSERT INTO users(email, password, display_name) VALUES ($1, $2, $3) RETURNING _id;`;
    const values = [email, hashedPass, displayName];
    const { rows } = await db.query(q, values);
    console.log(rows);
    const user = {
      id: rows[0]._id,
      displayName: rows[0].display_name,
    };
    res.locals = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in authController.signUp: ${err}`,
      status: 500,
      message: 'Error on user sign up.',
    });
  }
}

/**
 * Log in controller 
 */
 authController.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const q = `SELECT * FROM users WHERE email = '${email}';`;
    const { rows } = await db.query(q);
    if (await bcrypt.compare(password, rows[0].password)) {
      console.log(rows[0]);
      const user = {
        id: rows[0]._id,
        displayName: rows[0].display_name,
      };
      res.locals = user;
      console.log(res.locals);
      return next();
    } else {
      return next({ status: 403 });
    }
  } catch (err) {
    return next({
      log: `Error in userController.login: ${err}`,
      status: 500,
      message: 'Cannot login user right now, sorry!',
    });
  }
};
module.exports = authController;