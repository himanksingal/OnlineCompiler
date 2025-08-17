const express = require('express');
const cors = require('cors');
const { generateFile } = require('./generateFile');
const { generateInputFile } = require('./generateInputFile');
const { executeCpp } = require('./executeCpp');
const { executeJava } = require('./executeJava');
const { executePython } = require('./executePython');


const app = express();
app.use(cors());
app.use(express.json());

app.get("/compiler", (req, res) => {
  res.json({ online: 'compiler' });
});

app.post("/run", async (req, res) => {
  const { language, code, input } = req.body;
  try {
    let format;
    if (language === "cpp") format = "cpp";
    else if (language === "java") format = "java";
    else if (language === "python") format = "py";
    else return res.status(400).json({ error: "Invalid language" });

    const filepath = await generateFile(format, code);
    const inputPath = await generateInputFile(input);

    let output;
    if (language === "cpp") {
      output = await executeCpp(filepath, inputPath);
    } else if (language === "java") {
      output = await executeJava(filepath, inputPath);
    } else if (language === "python") {
      output = await executePython(filepath, inputPath);
    }
    res.json({ output });
  } catch (err) {
    let errMsg = err.stderr || err.error || err.toString();
    res.status(500).json({ error: errMsg });
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Compiler service running on port ${PORT}`);
});
