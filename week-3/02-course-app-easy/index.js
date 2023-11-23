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
    ADMINS.push({
        username: req.body.username,
        password: req.body.password
    })
    res.json({ message: 'Admin created successfully' });
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
    // logic to log in admin
    res.json({ message: 'Logged in successfully' });
});

app.post('/admin/courses', authenticateAdmin, (req, res) => {
    // logic to create a course
    const newCourse = req.body;
    const courseId = Math.floor(Math.random() * 100);
    COURSES.push({
        id: courseId,
        title: newCourse.title,
        description: newCourse.description,
        price: newCourse.price,
        imageLink: newCourse.imageLink,
        published: newCourse.published
    })
    res.json({ message: 'Course created successfully', courseId: courseId });
});

app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
    // logic to edit a course
    const updatedCourse = req.body;
    const courseId = parseInt(req.params.courseId);
    const index = COURSES.findIndex(course => course.id === courseId);
    if (index !== -1) {
        COURSES[index] = {
            id: courseId,
            title: updatedCourse.title,
            description: updatedCourse.description,
            price: updatedCourse.price,
            imageLink: updatedCourse.imageLink,
            published: updatedCourse.published
        };
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
    USERS.push({
        username: req.body.username,
        password: req.body.password,
        purchasedCourses: []
    })
    res.json({ message: 'User created successfully' });
});

app.post('/users/login', authenticateUser, (req, res) => {
    // logic to log in user
    res.json({ message: 'Logged in successfully' });
});

app.get('/users/courses', authenticateUser, (req, res) => {
    // logic to list all courses
    const filteredCourses = COURSES.filter(course => course.published === true)
    res.json({ courses: filteredCourses });
});

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
    // logic to purchase a course
    const courseId = parseInt(req.params.courseId, 10);;
    const newPurchase = COURSES.find(course => course.id === courseId);
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
    res.json({ purchasedCourses: USERS[parseInt(req.userIndex, 10)].purchasedCourses })
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
