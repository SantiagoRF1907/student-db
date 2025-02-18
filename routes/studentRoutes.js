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

// Get student by email
router.get("/findByEmail/:email", async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.params.email });
    if (!student) {
      res.status(404).send({ message: "Student not found" });
    }
    res.status(201).send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update students
router.put("/updateGradeByEmail/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const newGrade = req.body.grade;

    if (!newGrade) {
      res.status(400).send({ message: "Grade is required" });
    }

    const student = await Student.findOneAndUpdate(
      { email },
      { newGrade },
      { new: true }
    );

    if (!student) {
      res.status(404).send({ message: "Student not found" });
    }

    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: "Student deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
