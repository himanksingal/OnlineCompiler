const { exec } = require("child_process");

const executeJava = (filepath, inputPath) => {
  // Directly run the .java file using Java 11+ "source file mode"
  // Handles input redirection from inputPath
  const command = `java "${filepath}" < "${inputPath}"`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message || error);
      } else {
        resolve(stdout);
      }
    });
  });
};

module.exports = { executeJava };
