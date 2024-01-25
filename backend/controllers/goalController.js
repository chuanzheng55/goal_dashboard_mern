// @desc: Get goals
// @route: GET/api/goals
// @access: private
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get goals" });
};

// @desc: create goals
// @route: POST/api/goals
// @access: private
const setGoal = (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "please add a text field" });
  }
  res.status(200).json({ message: "set goals" });
};

// @desc: Update goal
// @route: PUT/api/goals/:id
// @access: private
const updateGoal = (req, res) => {
  res.status(200).json({ message: `update goals ${req.params.id}` });
};

// @desc: Delete goal
// @route: DELETE/api/goals/:id
// @access: private
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete goals ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
