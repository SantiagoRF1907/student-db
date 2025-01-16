const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

// Create a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).send(newStudent);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(201).send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update students
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete students
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: "Student deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
