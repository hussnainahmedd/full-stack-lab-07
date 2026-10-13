// Lab 07 — Task 1: Calculator module demo
// Imports calculator.js and exercises all four operations,
// including the division-by-zero guard.
const calculator = require("./calculator");

console.log("Addition:", calculator.add(10, 5));
console.log("Subtraction:", calculator.subtract(10, 5));
console.log("Multiplication:", calculator.multiply(10, 5));
console.log("Division:", calculator.divide(10, 5));

try {
  calculator.divide(10, 0);
} catch (err) {
  console.log("Division by zero ->", err.message);
}
