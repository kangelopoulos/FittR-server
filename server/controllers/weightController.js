const db = require('../models/postgres');
const weightController = {};

weightController.postWeight = async (req, res, next) => {
  const { weight, user_id, date } = req.body;
  try {
    const q = `INSERT INTO user_weights(user_id, date, weight) 
                VALUES($1, $2, $3)`;
    const vals = [user_id, date, weight.toFixed(2)];
    const { rows } = await db.query(q, vals)
    console.log(rows);
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.postWeight: ${err}`,
      status: 500,
      message: 'Cannot add weight, please try again.',
    });
  }
};

weightController.getWeights = async (req, res, next) => {
  const { user_id } = req.query;
  try {
    const q = `SELECT _id, date, weight 
                FROM user_weights 
                WHERE user_id = $1 
                ORDER BY date`;
    const vals = [user_id];
    const { rows } = await db.query(q, vals)
    res.locals = rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.postWeight: ${err}`,
      status: 500,
      message: 'Cannot add weight, please try again.',
    });
  }
};


module.exports = weightController;