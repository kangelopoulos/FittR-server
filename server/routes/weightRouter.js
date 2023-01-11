const express = require("express");
const router = express.Router();
const weightController = require("../controllers/weightController");

/**
 * Post weight
 * req.body - weight (number), user_id (number), date (date)
 * middleware -
 * res.locals - n/a
 */
router.post("/", weightController.postWeight, (req, res) => {
  return res.send(res.locals);
});

/**
 * Get weights route
 * req.body - user_id (number), year (number)
 * middleware -
 * res.locals - array of objs with keys weight (number), date (date/str), _id (number)
 */
router.get("/", weightController.getWeights, (req, res) => {
  return res.send(res.locals);
});

/**
 * Delete weight route
 * req.body - user_id (number), weight_id (number)
 * middleware -
 * res.locals - n/a
 */
router.delete("/", weightController.deleteWeight, (req, res) => {
  return res.send(res.locals);
});

/**
 * Delete weight route
 * req.body - user_id (number)
 * middleware -
 * res.locals - n/a
 */
router.delete("/all", weightController.deleteAllWeights, (req, res) => {
  return res.send(res.locals);
});

/**
 * Update weight route
 * req.body - user_id (number), weight_id (number), weight (number)
 * middleware -
 * res.locals -
 */
router.patch("/", weightController.updateWeight, (req, res) => {
  return res.send(res.locals);
});

module.exports = router;
