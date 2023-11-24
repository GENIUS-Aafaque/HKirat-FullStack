const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Middleware for Admin Authentication
const authenticateAdmin = (req, res, next) => {
    const { username, password } = req.headers;
    const adminExists = ADMINS.find(admin => (admin.username === username && admin.password === password))
    if (adminExists) {
        next();
    } else {
        res.status(401).send("Admin authentication failed");
    }
};

// Admin Routes
app.post('/admin/signup', (req, res) => {
    // logic to sign up admin
    const reqAdmin = req.body;
    const existingAdmin = ADMINS.find(admin => admin.username === reqAdmin.username);
    if (existingAdmin) {
        res.status(403).json({ message: 'Admin already exists' });
    } else {
        ADMINS.push(reqAdmin);
        res.json({ message: 'Admin created successfully' });
    }
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
    // logic to log in admin
    res.json({ message: 'Logged in successfully' });
});

app.post('/admin/courses', authenticateAdmin, (req, res) => {
    // logic to create a course
    const newCourse = req.body;
    newCourse.id = Math.floor(Math.random() * 100);
    COURSES.push(newCourse)
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
});

app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
    // logic to edit a course
    const updatedCourse = req.body;
    const courseId = parseInt(req.params.courseId);
    const index = COURSES.findIndex(course => course.id === courseId);
    if (index !== -1) {
        Object.assign(COURSES[index], updatedCourse);
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get('/admin/courses', authenticateAdmin, (req, res) => {
    // logic to get all courses
    res.json({ courses: COURSES });
});

// Middleware for User Authentication
const authenticateUser = (req, res, next) => {
    const { username, password } = req.headers;
    const userIndex = USERS.findIndex(user => (user.username === username && user.password === password));
    if (userIndex !== -1) {
        req.userIndex = userIndex;
        next();
    } else {
        res.status(401).send("User authentication failed");
    }
};

// User routes
app.post('/users/signup', (req, res) => {
    // logic to sign up user
    const reqUser = req.body;
    const existingUser = USERS.find(user => user.username === reqUser.username);
    if (existingUser) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        USERS.push({ ...reqUser, purchasedCourses: [] });
        res.json({ message: 'User created successfully' });
    }
});

app.post('/users/login', authenticateUser, (req, res) => {
    // logic to log in user
    res.json({ message: 'Logged in successfully' });
});

app.get('/users/courses', authenticateUser, (req, res) => {
    // logic to list all courses
    const filteredCourses = COURSES.filter(course => course.published)
    res.json({ courses: filteredCourses });
});

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
    // logic to purchase a course
    const courseId = parseInt(req.params.courseId, 10);;
    const newPurchase = COURSES.find(course => course.id === courseId);
    // could also use req.user as it uses (pass by reference)
    const userIndex = parseInt(req.userIndex, 10);
    if (newPurchase) {
        USERS[userIndex].purchasedCourses.push(newPurchase.id);
        res.json({ message: 'Course purchased successfully' });
    } else {
        res.status(404).json({ message: 'Course not found or not available' });
    }
});

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {
    // logic to view purchased courses
    const userIndex = parseInt(req.userIndex, 10);
    const purchasedCourses = COURSES.filter(course => USERS[userIndex].purchasedCourses.includes(course.id));
    res.json({ purchasedCourses })
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
