// Lab 07 — Part C: reading and parsing a JSON file
const fs = require("fs");

const text = fs.readFileSync("students.json", "utf8");
const students = JSON.parse(text);

console.log(students);
console.log("Number of students:", students.length);
