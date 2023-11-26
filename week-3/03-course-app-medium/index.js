const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const fs = require('fs');

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Read data from file, or initialize to empty array if file does not exist
try {
    ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
    USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'));
} catch {
    ADMINS = [];
    USERS = [];
    COURSES = [];
}
console.log(ADMINS);

const SECRET = 'S3cr31-keY';

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
};

// Admin routes
app.post('/admin/signup', (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body;
    const admin = ADMINS.find(a => a.username === username);
    console.log("admin signup");
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    } else {
        const newAdmin = { username, password };
        ADMINS.push(newAdmin);
        fs.writeFileSync('admins.json', JSON.stringify(ADMINS));
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
});

app.post('/admin/login', (req, res) => {
    // logic to log in admin
    const { username, password } = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

app.post('/admin/courses', (req, res) => {
    // logic to create a course
    const course = req.body;
    course.id = COURSES.length + 1;
    COURSES.push(course);
    fs.writeFileSync('courses.json', JSON.stringify(COURSES));
    res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/courses/:courseId', (req, res) => {
    // logic to edit a course
    const course = COURSES.find(c => c.id === parseInt(req.params.courseId));
    if (course) {
        Object.assign(course, req.body);
        fs.writeFileSync('courses.json', JSON.stringify(COURSES));
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
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
