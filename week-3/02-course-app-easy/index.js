const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
    // logic to sign up admin
    ADMINS.push({
        username: req.body.username,
        password: req.body.password
    })
    res.json({ message: 'Admin created successfully' });
});

app.post('/admin/login', (req, res) => {
    // logic to log in admin
    const reqAdmin = req.headers;
    const adminExists = ADMINS.find(admin => (admin.username === reqAdmin.username && admin.password === reqAdmin.password))
    if (adminExists) {
        res.json({ message: 'Logged in successfully' });
    } else {
        res.status(404).send("Admin not found");
    }
});

app.post('/admin/courses', (req, res) => {
    // logic to create a course
    const reqAdmin = req.headers;
    const newCourse = req.body;
    const adminExists = ADMINS.find(admin => (admin.username === reqAdmin.username && admin.password === reqAdmin.password))
    if (adminExists) {
        const courseId = Math.floor(Math.random() * 100);
        COURSES.push({
            title: newCourse.title,
            description: newCourse.description,
            price: newCourse.price,
            imageLink: newCourse.imageLink,
            published: newCourse.published
        })
        res.json({ message: 'Course created successfully', courseId: courseId });
    } else {
        res.status(404).send("Admin not found");
    }
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
