// Lab 07 — Part C, section 5.5: write updated JSON back to a file
// Run once to append the sample student. Running it repeatedly
// appends another record each time.
const fs = require("fs");

const fileData = fs.readFileSync("students.json", "utf8");
const students = JSON.parse(fileData);

students.push({
  id: 4,
  name: "Hassan",
  department: "BSCS"
});

fs.writeFileSync(
  "students.json",
  JSON.stringify(students, null, 2),
  "utf8"
);

console.log("Student added and file updated.");
