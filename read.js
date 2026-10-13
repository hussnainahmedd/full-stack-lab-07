// Lab 07 — Part C: reading a text file with the fs module
const fs = require("fs");

const data = fs.readFileSync("students.txt", "utf8");

console.log(data);
