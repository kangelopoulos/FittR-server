const db = require("../models/postgres");
const weightController = {};

/**
 * Posts a weight for a user
 */
weightController.postWeight = async (req, res, next) => {
  const { weight, user_id, date } = req.body;
  let formattedWeight;
  try {
    if (weight - Math.floor(weight) !== 0)
      formattedWeight = parseFloat(weight).toFixed(2);
    else formattedWeight = weight;
    const q = `INSERT INTO user_weights(user_id, date, weight) 
                VALUES($1, $2, $3) 
                RETURNING _id, 
                  to_char(date, 'YYYY-MM-DD') as date, 
                  CAST(weight AS FLOAT) weight`;
    const vals = [user_id, date, formattedWeight];
    const { rows } = await db.query(q, vals);
    res.locals = { ...rows[0] };
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.postWeight: ${err}`,
      status: 500,
      message: "Cannot add weight, please try again.",
    });
  }
};

/**
 * Gets all user weights
 */
weightController.getWeights = async (req, res, next) => {
  const { user_id } = req.query;
  try {
    const q = `SELECT 
                  to_char(date, 'YYYY-MM-DD') as date, 
                  CAST(weight AS FLOAT) as weight, 
                  _id
                FROM user_weights 
                WHERE user_id = $1 
                ORDER BY date`;
    const vals = [user_id];
    const { rows } = await db.query(q, vals);
    res.locals = rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.getWeight: ${err}`,
      status: 500,
      message: "Cannot get weights, please reload the page.",
    });
  }
};

/**
 * Updates a specific user weight based on the weights _id
 */
weightController.updateWeight = async (req, res, next) => {
  const { weight_id, date, weight } = req.body;
  try {
    const q = `UPDATE user_weights
                SET weight = $1, 
                    date = $2
                WHERE _id = $3`;
    const vals = [weight, date, weight_id];
    const rows = await db.query(q, vals);
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.updateWeight: ${err}`,
      status: 500,
      message: "Cannot update weights right now, please try again.",
    });
  }
};

/**
 * Deletes a user weight based on a weight _id
 */
weightController.deleteWeight = async (req, res, next) => {
  const { weight_id } = req.body;
  try {
    const q = `DELETE FROM user_weights 
                WHERE _id = $1`;
    const vals = [weight_id];
    const rows = await db.query(q, vals);
    res.locals = rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.deleteWeight: ${err}`,
      status: 500,
      message: "Cannot delete a weight right now, please try again.",
    });
  }
};

/**
 * Deletes all weights for a user _id
 */
weightController.deleteAllWeights = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const q = `DELETE FROM user_weights 
                WHERE user_id = $1`;
    const vals = [user_id];
    const { rows } = await db.query(q, vals);
    res.locals = rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in weightController.deleteAllWeights: ${err}`,
      status: 500,
      message: "Cannot delete all weights right now, please try again.",
    });
  }
};

module.exports = weightController;
