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
      log: `Error in weightController.getWeight: ${err}`,
      status: 500,
      message: 'Cannot get weights, please reload the page.',
    });
  }
};

weightController.updateWeight = async (req, res, next) => {
  const { weight_id, newDate, newWeight } = req.body;
  try {
    const q = `UPDATE user_weights
                SET weight = $1, 
                    date = $2
                WHERE weight_id = $3`;
    const vals = [weight_id, newDate, newWeight];
    const { rows } = await db.query(q, vals)
    res.locals = rows;
    console.log(rows);
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.updateWeight: ${err}`,
      status: 500,
      message: 'Cannot update weights right now, please try again.',
    });
  }
};

weightController.deleteWeight = async (req, res, next) => {
  const { weight_id } = req.body;
  console.log(weight_id);
  try {
    const q = `DELETE FROM user_weights WHERE _id = $1 RETURNING *`
    const vals = [weight_id];
    const rows = await db.query(q, vals)
    res.locals = rows;
    console.log(rows);
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.updateWeight: ${err}`,
      status: 500,
      message: 'Cannot update weights right now, please try again.',
    });
  }
};

weightController.deleteAllWeights = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const q = `DELETE FROM user_weights WHERE user_id = $1`
    const vals = [user_id];
    const { rows } = await db.query(q, vals)
    res.locals = rows;
    console.log(rows);
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.updateWeight: ${err}`,
      status: 500,
      message: 'Cannot update weights right now, please try again.',
    });
  }
};

module.exports = weightController;