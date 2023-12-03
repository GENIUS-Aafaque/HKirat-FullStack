import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    // fetch all todos from server

    return (
        <>
            <div>
                <h1>Easy Todo App</h1>
                <input type="text" />
            </div>
        </>
    );
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return (
        <div id={props.id}>
            {props.title}
            {props.description}
            <button onClick={document.removeChild(getElementById(props.id))}>
                Delete
            </button>
        </div>
    );
}

export default App;
