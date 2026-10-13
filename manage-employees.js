// Lab 07 — Task 2: Employee JSON file handling
// Reads employees.json, displays all employees, adds a new one,
// and writes the updated array back to the file.
const fs = require("fs");

const FILE = "employees.json";

// 1. Read the JSON file
const text = fs.readFileSync(FILE, "utf8");
const employees = JSON.parse(text);

// 2. Display all employees
console.log("Current employees:");
employees.forEach((emp) => {
  console.log(`- [${emp.id}] ${emp.name} | ${emp.position} | Rs ${emp.salary}`);
});

// 3. Add a new employee (id = max existing id + 1)
const newId = employees.length
  ? Math.max(...employees.map((e) => e.id)) + 1
  : 1;
const newEmployee = {
  id: newId,
  name: "Danish Ali",
  position: "DevOps Engineer",
  salary: 130000,
};
employees.push(newEmployee);
console.log("\nAdded:", newEmployee);

// 4. Write the updated data back to the file
fs.writeFileSync(FILE, JSON.stringify(employees, null, 2), "utf8");
console.log("employees.json updated. Total employees:", employees.length);
