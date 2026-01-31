const Student = require("../models/Student");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ message: "✅ Student created", student });
  } catch (error) {
    res.status(400).json({ message: "❌ Error creating student", error: error.message });
  }
};

// READ ALL
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching students", error: error.message });
  }
};

// READ ONE
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "❌ Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: "❌ Invalid ID", error: error.message });
  }
};

// UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "❌ Student not found" });
    res.json({ message: "✅ Student updated", student });
  } catch (error) {
    res.status(400).json({ message: "❌ Error updating student", error: error.message });
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "❌ Student not found" });
    res.json({ message: "✅ Student deleted" });
  } catch (error) {
    res.status(400).json({ message: "❌ Error deleting student", error: error.message });
  }
};
