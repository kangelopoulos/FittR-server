const db = require("../models/postgres");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {};

/**
 * Registers the user and sets a jwt
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
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.cookie('token', accessToken, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });
    res.locals = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in authController.signUp: ${err}`,
      status: 500,
      message: "Sign up failed, please try again.",
    });
  }
};

/**
 * Logs in the user and sets a jwt
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
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      })
      res.cookie('token', accessToken, {
        sameSite: 'none',
        httpOnly: true,
        secure: true, 
      });
      console.log(res.cookie);
      res.locals = user;
      return next();
    } else {
      return next({ status: 403 });
    }
  } catch (err) {
    return next({
      log: `Error in authController.login: ${err}`,
      status: 500,
      message: "Login failed, please try again.",
    });
  }
};

/**
 * Check for a cookie - if present, return user info 
 */
authController.authorization = async (req,res,next) => {
  console.log(req.headers.cookies);
  console.log(req);
  if(req.cookies){
    try {
      const token = req.cookies.token;
      if(token){
        console.log(token);
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const q = `SELECT * FROM users WHERE _id = ${data.id};`;
        const { rows } = await db.query(q);
        if(rows[0]){
          const user = {
            id: rows[0]._id,
            displayName: rows[0].display_name,
          };
          res.locals = user;
        }
      } else {
        return res.status(403).send();
      }
      return next();
    } catch(err) {
      return next({
        log: `Error in authController.authorization: ${err}`,
        status: 403,
        message: "Not authorized.",
      });
    }
  }
  console.log('got here');
  return res.status(403).send();
}


/**
 * Reassign the value of the jwt and expiration to be immediate
 */
authController.destroyToken = async (req, res, next) => {
  try {
    if(req.cookies){
      if(req.cookies.token){
        console.log('clearing', req.cookies.token)
        res.clearCookie('token', {
          sameSite: "None",
          httpOnly: true,
          secure: true
        }).send();
      }
    }
  } catch (err) {
    return next({
      log: `Error in authController.destroyToken: ${err}`,
      status: 500,
      message: "Token not destroyed.",
    });
  }
};

module.exports = authController;
