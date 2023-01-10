const db = require('../models/postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {};

authController.signUp = async (req, res, next) => {
  const { email, password, displayName } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const queryStr = `INSERT INTO users(email, password, display_name) VALUES ($1, $2, $3) RETURNING * ;`;
    const values = [email, hashedPass, displayName];
    const { rows } = await db.query(queryStr, values);
    console.log(rows);
    const user = {
      id: rows[0]._id,
      displayName: rows[0].display_name,
      lastLogin: rows[0].last_login,
      email: rows[0].email,
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


module.exports = authController;