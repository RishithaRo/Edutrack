const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/edutrackdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define the Student schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Rollno: String,
    Date_Of_Birth: String,
    Department: String,
    Mobile_No: String,
    email_id: String,
    section: String,
    password: String, // Ensure this field is present
  });

// Create the Student model
const Student = mongoose.model('Student', studentSchema);
app.use(express.json());

// Endpoint to get the logged-in user's info
app.get('/api/user', async (req, res) => {
  try {
      // Assume the logged-in user's ID is available in req.session.userId or req.headers.authorization (JWT token)
      const Rollno = req.session.Rollno; // Example for session-based authentication
      
      const user = await Student.findOne({ Rollno });
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json({ Name: user.Name });
  } catch (error) {
      res.status(500).send('Server error');
  }
});

// API endpoint to handle signup
app.post('/signup', async (req, res) => {
    try {
      const { Name, Rollno, Date_Of_Birth, Department, Mobile_No, email_id, section, password } = req.body;
  
      // Validate required fields
      if (!Name || !Rollno || !Date_Of_Birth || !Department || !Mobile_No || !email_id || !section || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      // Check if Rollno already exists
      const existingStudent = await Student.findOne({ Rollno });
      if (existingStudent) {
        return res.status(400).json({ error: 'Student with this Rollno already exists.' });
      }
  
      // Save to MongoDB
      const newStudent = new Student({ Name, Rollno, Date_Of_Birth, Department, Mobile_No, email_id, section, password });
      await newStudent.save();
  
      res.status(201).json({ message: 'Student registered successfully!' });
    } catch (error) {
      console.error('Error saving student:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.post('/login', async (req, res) => {
    try {
      const { Rollno, password } = req.body;
  
      // Validate input
      if (!Rollno || !password) {
        return res.status(400).json({ error: 'Rollno and password are required.' });
      }
  
      // Find the student by Rollno
      const student = await Student.findOne({ Rollno });
      if (!student) {
        return res.status(400).json({ error: 'Invalid Student ID or Password.' });
      }
  
      // Check if the password matches
      if (student.password !== password) {
        return res.status(400).json({ error: 'Invalid Student ID or Password.' });
      }
  
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/StudentLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'StudentLogin.html'));
});

app.get('/TeacherLogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'TeacherLogin.html'));
});

// Define the teacher schema
const teacherSchema = new mongoose.Schema({
  Name: String,
  Company_Name: String,
  Mail_id: String,
  username: String,
  Password: String, // Ensure this field is present
});

// Create the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

// API endpoint for teacher login
app.post('/teacherLogin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Find the teacher by username
    const teacher = await Teacher.findOne({ username });
    if (!teacher) {
      return res.status(400).json({ error: 'Invalid username.' });
    }

    // Check if the password matches
    if (teacher.Password !== password) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Teacher login successful!' });
  } catch (error) {
    console.error('Error during teacher login:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
