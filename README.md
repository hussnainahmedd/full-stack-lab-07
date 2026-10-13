# Full-Stack Lab 07 — Node.js Fundamentals, REST APIs & Postman

BSCS coursework — Air University, Islamabad.

## What this lab covers

| Part | Topic | Files |
|------|-------|-------|
| A | Node.js fundamentals — run JS outside the browser | `app.js` |
| B | Modules — `require()` / `module.exports` (manual example) | `math.js` |
| B | **Task 1** — calculator module (÷0 guard) + runner | `calculator.js`, `task1.js` |
| C | File handling — text with `fs` | `write.js`, `read.js` → `students.txt` |
| C | File handling — read + parse JSON | `readjson.js` |
| C | **Task 2** — employees JSON: read, display, add, write back | `manage-employees.js`, `employees.json` |
| D–E | Student Management REST API (Express, CRUD + **Task 3** dept. filter + **Task 4** validation + file persistence) | `server.js`, `students.json` |
| F | API testing with Postman (see checklist below) | — |
| G | **Assignment** — Book Management REST API | `book-server.js`, `books.json` |

## Run it

```bash
npm install
node app.js               # Part A: first Node program
node task1.js             # Task 1: calculator module demo
node write.js             # creates students.txt
node read.js              # reads students.txt
node readjson.js          # reads + parses students.json
node manage-employees.js  # Task 2: reads, adds, rewrites employees.json

node server.js            # Student API  -> http://localhost:3000
node book-server.js       # Book API     -> http://localhost:3001
```

## Student API endpoints

| Method | Endpoint | Result |
|--------|----------|--------|
| GET | `/students` | All students (200) |
| GET | `/students/department/:department` | Filter by department, e.g. `BSCS` (200) |
| GET | `/students/:id` | One student, or 404 |
| POST | `/students` | Create student (201), 400 on invalid input |
| PUT | `/students/:id` | Update student (200), 404 / 400 |
| DELETE | `/students/:id` | Delete student (200), 404 |

## Book API endpoints (assignment)

Same CRUD pattern on port **3001**: `GET /books`, `GET /books/:id`,
`POST /books`, `PUT /books/:id`, `DELETE /books/:id`.
Book body: `{ "title", "author", "price" }` — price must be a positive number.

## Postman checklist

- [ ] GET all → `GET /students` → 200, array of students
- [ ] GET one → `GET /students/1` → 200
- [ ] GET missing → `GET /students/100` → 404 + message
- [ ] POST valid → `POST /students` `{name, department}` → 201 + new student
- [ ] POST invalid → `POST /students` `{}` → 400 + message
- [ ] PUT → `PUT /students/:id` → 200 + updated student
- [ ] DELETE → `DELETE /students/:id` → 200 + deletion message
- [ ] Re-GET deleted id → 404
- [ ] Department filter → `GET /students/department/BSCS` → 200, BSCS only
- [ ] Same five operations against the Book API on port 3001

## Author

**Hussnain Ahmad** — BSCS (Evening), Air University · Roll No 242816
