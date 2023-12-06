import axios from "axios";
import React, { useEffect } from "react";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <div>
            <h1>Register to the website</h1>
            <br />
            <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input
                type={"text"}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button
                onClick={() => {
                    axios.post("http://localhost:3000/admin/signup", {
                        username: email,
                        password: password,
                    });
                }}
            >
                Register
            </button>
            <br />
            <br />
            Already a user? <a href="/login">Login</a>
        </div>
    );
}

export default Register;
