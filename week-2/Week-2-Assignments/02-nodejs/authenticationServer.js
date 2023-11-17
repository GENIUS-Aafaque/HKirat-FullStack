/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

let users = [];

// function generateRandom(length) {
//     let uniqueID = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     let counter = 0;
//     while (counter < length) {
//         uniqueID += characters.charAt(Math.floor(Math.random() * charactersLength));
//         counter += 1;
//     }
//     return uniqueID;
//     // Alternate approach
//     // let r = (Math.random() + 1).toString(36).substring(7);
//     // console.log("random", r);
// }

function signUp(req, res) {
    let user = req.body;
    let email = user.email;
    if (users.some((user) => user.email === email)) {
        res.status(400).send("User already exists.")
    } else {
        let id = generateRandom(5);
        user.id = id;
        users.push(user);
        res.status(201).send("Sign up successful.")
    }
}

function logIn(req, res) {
    let user = req.body;
    let email = user.email;
    let password = user.password;
    let actualUser = users.find((user) => (user.email === email && user.password === password));
    if (actualUser && password === actualUser.password) {
        res.status(200).res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    } else {
        res.status(401).send("Credentials are invalid.");
    }
}

function data(req, res) {
    let email = req.headers.email;
    let password = req.headers.password;
    let usersData = [];
    if (users.some((user) => (user.email === email && user.password === password))) {
        users.forEach((element) => {
            usersData.push({
                firstName: element.firstName,
                lastName: element.lastName,
                email: element.email
            })
        })
        res.status(200).json({ usersData });
    } else {
        res.status(401).send("Credentials are invalid.");
    }
}

app.use(bodyParser.json());

app.post("/signup", signUp);
app.post("/login", logIn);
app.get("/data", data);

// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

module.exports = app;
