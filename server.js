// Lab 07 — Student Management REST API (Node.js + Express)
// Endpoints:
//   GET    /students                     -> all students
//   GET    /students/department/:dept    -> students of one department
//   GET    /students/:id                 -> one student (404 if missing)
//   POST   /students                     -> create (201, 400 on bad input)
//   PUT    /students/:id                 -> update (404 if missing, 400 on bad input)
//   DELETE /students/:id                 -> delete (404 if missing)
// Changes are persisted back to students.json after every write.
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "students.json";

app.use(express.json());

let students = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

// Persist the in-memory array back to the JSON file.
function saveStudents() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), "utf8");
}

function validStudentInput(body) {
  return (
    body &&
    typeof body.name === "string" &&
    body.name.trim() &&
    typeof body.department === "string" &&
    body.department.trim()
  );
}

// GET: retrieve all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// GET: filter students by department (Task 3)
// Registered before /students/:id so "department" is never read as an :id.
app.get("/students/department/:department", (req, res) => {
  const department = req.params.department.toLowerCase();
  const result = students.filter(
    (item) => item.department.toLowerCase() === department
  );
  res.status(200).json(result);
});

// GET: retrieve one student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  return res.status(200).json(student);
});

// POST: create a student
app.post("/students", (req, res) => {
  if (!validStudentInput(req.body)) {
    return res.status(400).json({
      message: "name and department are required as non-empty strings",
    });
  }
  const newId = students.length
    ? Math.max(...students.map((item) => item.id)) + 1
    : 1;
  const newStudent = {
    id: newId,
    name: req.body.name.trim(),
    department: req.body.department.trim(),
  };
  students.push(newStudent);
  saveStudents();
  return res.status(201).json(newStudent);
});

// PUT: update a student's name and department
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  if (!validStudentInput(req.body)) {
    return res.status(400).json({
      message: "name and department are required as non-empty strings",
    });
  }
  student.name = req.body.name.trim();
  student.department = req.body.department.trim();
  saveStudents();
  return res.status(200).json(student);
});

// DELETE: remove a student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  const [deletedStudent] = students.splice(index, 1);
  saveStudents();
  return res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
