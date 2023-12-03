import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function useTodos() {
    const [todos, setTodos] = useState([]);
    // fetch all todos from server
    useEffect(() => {
        axios
            .get("http://localhost:3000/todos")
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setInterval(() => {
            axios
                .get("http://localhost:3000/todos")
                .then((response) => {
                    setTodos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    }, []);
    return todos;
}

function App() {
    const todos = useTodos();
    return (
        <>
            <div>
                <h1>Easy Todo App</h1>
                <input type="text" />
            </div>
            <div>
                {todos.map((todo) => (
                    <Todo
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                    ></Todo>
                ))}
            </div>
        </>
    );
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    function deleteTodo() {
        // Make an Axios DELETE request to your server
        axios
            .delete(`http://localhost:3000/todos/${props.id}`)
            .then((response) => {
                console.log("Todo deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting todo: ", error);
            });
    }

    return (
        <div id={props.id}>
            {props.title}
            {props.description}
            <button onClick={deleteTodo}>Delete</button>
        </div>
    );
}

export default App;
