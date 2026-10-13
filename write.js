// Lab 07 — Part C: writing a text file with the fs module
const fs = require("fs");

fs.writeFileSync("students.txt", "Ali\nAhmed\nSara", "utf8");

console.log("File written successfully.");
