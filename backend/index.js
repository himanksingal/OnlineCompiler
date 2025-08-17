// backend/index.js (merged unified backend server)

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const COMPILER_SERVICE_URL = process.env.COMPILER_SERVICE_URL;


// const { generateFile } = require('../compiler/generateFile');
// const { generateInputFile } = require('../compiler/generateInputFile');
// const { executeCpp } = require('../compiler/executeCpp');
const { aiCodeReview } = require('./aiCodeReview');

// DB and Models
const { DBConnection } = require('./database/db');
const User = require('./models/user');
const Problem = require('./models/problems');

// Auth middleware (RBAC)
const { authenticate, requireAdmin } = require('./middleware/auth');

// App init
const app = express();

// Connect DB
DBConnection();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,      // set to your frontend origin in production
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Extra routes
const adminUsersRouter = require("./routes/adminUsers");
app.use("/admin/users", adminUsersRouter);

// ===== GENERAL TEST ROUTES =====
app.get("/", (req, res) => {
  res.send("Hello, World! This is the backend server.");
});

app.get("/anything", (req, res) => {
  res.send("Hello, I am here at Anything!");
});

app.get("/register", (req, res) => {
  res.send("<h1>Register Page</h1><p>Welcome to the registration page!</p>");
});

app.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1><p>Welcome to the login page!</p>");
});

// ===== AUTH ROUTES =====

// Register
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(firstname && lastname && email && password)) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required information: firstname, lastname, email, and password"
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
      // role defaults to 'user'
    });

    // Include role in JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    const userResponse = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userResponse,
      token
    });

  } catch (error) {
    console.error("Registration error:", error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during registration"
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    const userResponse = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role
    };
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true for HTTPS, false for local testing
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    };
    res.status(200)
      .cookie("token", token, cookieOptions)
      .json({
        success: true,
        message: "Login successful!",
        user: userResponse,
        token: token
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error during login" });
  }
});


// Make sure you have cookie-parser enabled earlier in your file:
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

app.post('/logout', (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })
    .status(200)
    .json({ success: true, message: "Logged out" });
});



// Current user (used by frontend to bootstrap auth state)
app.get("/auth/me", authenticate, (req, res) => {
  const u = req.user;
  res.json({
    success: true,
    user: {
      _id: u._id,
      firstname: u.firstname,
      lastname: u.lastname,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    }
  });
});

// ===== Problem Routes (RBAC) =====

// accessible by all logged-in users (student/user, not just admin)
app.get('/problems', authenticate, async (req, res) => {
  try {
    // Return only public/user-safe problem fields
    const problems = await Problem.find({}, "problemId title difficulty tags"); // Only basic info
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// Read: any authenticated user
app.get('/admin/problems', authenticate, async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

app.get('/admin/problems/:problemId', authenticate, async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const problem = await Problem.findOne({ problemId });
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.status(200).json(problem);
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({ error: 'Failed to fetch problem' });
  }
});

// Write: admin-only
app.post('/admin/problems', authenticate, requireAdmin, async (req, res) => {
  try {
    const problemData = req.body;

    const existing = await Problem.findOne({ problemId: problemData.problemId });
    if (existing) {
      return res.status(409).json({ error: 'Problem with this ID already exists' });
    }

    const problem = new Problem(problemData);
    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    console.error('Error creating problem:', error);
    res.status(400).json({ error: error.message });
  }
});

app.put('/admin/problems/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const problemId = req.params.id;
    const updates = req.body;

    const updatedProblem = await Problem.findByIdAndUpdate(problemId, updates, { new: true });
    if (!updatedProblem) return res.status(404).json({ error: 'Problem not found' });

    res.status(200).json(updatedProblem);
  } catch (error) {
    console.error('Error updating problem:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/admin/problems/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const problemId = req.params.id;
    const deleted = await Problem.findByIdAndDelete(problemId);
    if (!deleted) return res.status(404).json({ error: 'Problem not found' });
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    console.error('Error deleting problem:', error);
    res.status(400).json({ error: error.message });
  }
});

// Test cases: admin-only
app.post('/admin/problems/:id/testcases', authenticate, requireAdmin, async (req, res) => {
  try {
    const problemId = req.params.id;
    const testCase = req.body;

    if (!testCase.input || !testCase.output) {
      return res.status(400).json({ error: 'Test case input and output are required' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    problem.testCases.push(testCase);
    await problem.save();

    res.status(201).json(problem);
  } catch (error) {
    console.error('Error adding test case:', error);
    res.status(400).json({ error: error.message });
  }
});

app.put('/admin/problems/:problemId/testcases/:testcaseId', authenticate, requireAdmin, async (req, res) => {
  try {
    const { problemId, testcaseId } = req.params;
    const updates = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const testCase = problem.testCases.id(testcaseId);
    if (!testCase) return res.status(404).json({ error: 'Test case not found' });

    if (updates.input !== undefined) testCase.input = updates.input;
    if (updates.output !== undefined) testCase.output = updates.output;
    if (updates.isHidden !== undefined) testCase.isHidden = updates.isHidden;

    await problem.save();
    res.status(200).json(problem);
  } catch (error) {
    console.error('Error updating test case:', error);
    res.status(400).json({ error: error.message });
  }
});

app.delete('/admin/problems/:problemId/testcases/:testcaseId', authenticate, requireAdmin, async (req, res) => {
  try {
    const { problemId, testcaseId } = req.params;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const testCaseIndex = problem.testCases.findIndex(tc => tc._id.toString() === testcaseId);
    if (testCaseIndex === -1) {
      return res.status(404).json({ error: 'Test case not found' });
    }

    problem.testCases.splice(testCaseIndex, 1);
    await problem.save();

    res.json({ message: 'Test case deleted successfully', problem });
  } catch (error) {
    console.error('Error deleting test case:', error);
    res.status(400).json({ error: error.message });
  }
});

// ===== COMPILER =====

// ===== SUBMIT: Run code against all test cases for a problem =====
app.post("/submit", authenticate, async (req, res) => {
  const { language, code, problemId } = req.body;

  if (!language || !code || !problemId) {
    return res.status(400).json({ error: "Missing language, code, or problemId" });
  }

  const problem = await Problem.findOne({ problemId });
  if (!problem) {
    return res.status(404).json({ error: "Problem not found" });
  }

  const testResults = [];
  for (const testCase of problem.testCases) {
    try {
      // Call to code execution microservice
      const runResp = await axios.post(
       `${COMPILER_SERVICE_URL}/run`,
        { language, code, input: testCase.input },
        { timeout: 20000 }
      );
      const actual = (runResp.data.output ?? "").trim();
      const expected = (testCase.output ?? "").trim();
      testResults.push({
        input: testCase.input,
        expected: testCase.output,
        actual,
        passed: actual === expected
      });
    } catch (err) {
      testResults.push({
        input: testCase.input,
        expected: testCase.output,
        actual: "",
        passed: false,
        error: err.response?.data?.error || err.message
      });
    }
  }

  res.json({ testResults });
});


// Optionally forward, for frontend:
app.get("/compiler", async (req, res) => {
  try {
    const health = await axios.get(`${COMPILER_SERVICE_URL}/compiler`);
    res.json(health.data);
  } catch (err) {
    res.status(503).json({ online: false, error: 'Compiler unreachable' });
  }
});

const axios = require('axios');


app.post("/run", async (req, res) => {
  try {
    // Forward the request to the compiler service (port 8080)
    const response = await axios.post(`${COMPILER_SERVICE_URL}/run`, req.body, { timeout: 20000 });
    res.json(response.data);
  } catch (error) {
    const message = error.response?.data?.error || error.message || "Compiler error";
    res.status(500).json({ error: message });
  }
});

app.post("/ai-review", async (req, res) => {
  const { code } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
    const review = await aiCodeReview(code);
    res.json({ "review": review });
  } catch (error) {
    res.status(500).json({ error: "Error in AI review, error: " + error.message });
  }
});

// ===== START THE SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
