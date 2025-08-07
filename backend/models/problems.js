// models/Problem.js

const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  input:    { type: String, required: true },
  output:   { type: String, required: true },
  isHidden: { type: Boolean, default: false } // false: sample; true: hidden test case
});

const ProblemSchema = new mongoose.Schema({
  problemId:   { type: String, required: true, unique: true }, // e.g. "PROB001"
  title:       { type: String, required: true },
  description: { type: String, required: true },
  tags:        { type: [String], default: [] },
  difficulty:  { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  testCases:   { type: [TestCaseSchema], default: [] },
  targetedTimeComplexity: { type: String, required: true } // e.g. "O(N log N)"
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
