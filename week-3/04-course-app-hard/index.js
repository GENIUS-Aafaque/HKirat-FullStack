const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

app.use(express.json());

const SECRET = "S3cr31-keY";

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: String,   // alt - { type: String }
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://GENIUS:genius313@cluster0.nnx2fnq.mongodb.net/course-app', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "course-app" });

// Admin routes
app.post('/admin/signup', async (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body;
    const user = await Admin.findOne({ username });
    if (user) {
        res.status(403).json({ message: "Admin already exists" });
    } else {
        const newAdmin = new Admin({ username, password });
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
});

app.post('/admin/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.body;
    const user = await Admin.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json("Invalid credentials");
    }
});

app.post('/admin/courses', (req, res) => {
    // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
    // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
    // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
    // logic to sign up user
});

app.post('/users/login', (req, res) => {
    // logic to log in user
});

app.get('/users/courses', (req, res) => {
    // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
    // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
    // logic to view purchased courses
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
