const express = require("express");
const router = express.Router();
const weightController = require("../controllers/weightController");

/**
 * Route to post a new weight for a user
 */
router.post("/", weightController.postWeight, (req, res) => {
  return res.status(200).send(res.locals);
});

/**
 * Route to get all weights for a user
 */
router.get("/", weightController.getWeights, (req, res) => {
  return res.status(200).send(res.locals);
});

/**
 * Route to delete a weight for a user
 */
router.delete("/", weightController.deleteWeight, (req, res) => {
  return res.status(200).send(res.locals);
});

/**
 * Route to delete all weights for a user
 */
router.delete("/all", weightController.deleteAllWeights, (req, res) => {
  return res.status(200).send(res.locals);
});

/**
 * Route to update a weight and date for a user
 */
router.patch("/", weightController.updateWeight, (req, res) => {
  return res.status(200).send(res.locals);
});

module.exports = router;
