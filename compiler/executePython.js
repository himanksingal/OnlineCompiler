const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const executePython = (filepath, inputPath) => {
  // Use python3 for best compatibility
  const command = `python3 "${filepath}" < "${inputPath}"`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

module.exports = { executePython };
