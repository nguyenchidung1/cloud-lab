const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://cluster0.xxxx.mongodb.net/qlsv?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Định nghĩa Schema
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// API lấy danh sách sinh viên (GET)
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API thêm sinh viên mới (POST)
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API cập nhật sinh viên (PUT)
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API xóa sinh viên (DELETE)
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Đã xóa thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));