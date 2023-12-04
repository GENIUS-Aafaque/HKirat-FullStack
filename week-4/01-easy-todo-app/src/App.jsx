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
    const [newTodo, setNewTodo] = useState({ title: "", description: "" });
    const todos = useTodos();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
    };

    const handleAddTodo = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/todos",
                newTodo
            );
            console.log("Todo created successfully: ", response.data);

            setNewTodo({ title: "", description: "" });
        } catch (error) {
            console.error("Error creating todo: ", error);
        }
    };

    return (
        <>
            <div>
                <h1>Easy Todo App</h1>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={newTodo.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={newTodo.description}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div>
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                    />
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
