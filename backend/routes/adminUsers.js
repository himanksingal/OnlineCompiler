const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { authenticate, requireAdmin } = require("../middleware/auth");

// Get all users (admin only)
router.get("/", authenticate, requireAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

// Delete user by id
router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    return res.status(400).json({ message: "Cannot delete yourself" });
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Change user role
router.put("/:id/role", authenticate, requireAdmin, async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  if (req.user._id.toString() === req.params.id) {
    return res.status(400).json({ message: "Cannot change your own role" });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Role updated", user });
});



module.exports = router;
