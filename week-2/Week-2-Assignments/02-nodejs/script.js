function getTodos() {
    fetch("http://localhost:3000/todos", {
        method: "GET"
    }).then((resp) => {
        resp.json().then(data => {
            for (let i = 0; i < data.length; i++) {
                const parentElement = document.getElementById("mainArea");

                const childElement = document.createElement("div");
                childElement.id = `todo_${data[i].id}`;

                const titleElement = document.createElement("span");
                titleElement.innerHTML = data[i].title + "  ";

                const descriptionElement = document.createElement("span");
                descriptionElement.innerHTML = data[i].description + "  ";

                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.addEventListener("click", () => deleteTodo(data[i].id));

                childElement.appendChild(titleElement);
                childElement.appendChild(descriptionElement);
                childElement.appendChild(deleteButton);

                parentElement.appendChild(childElement);
                parentElement.appendChild(document.createElement("br"));
            }
        })
    })
}
getTodos();

function postTodos() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resp) => {
        resp.json().then(data => {
            const parentElement = document.getElementById("mainArea");

            const childElement = document.createElement("div");
            childElement.id = `todo_${data.id}`;

            const titleElement = document.createElement("span");
            titleElement.innerHTML = data.title + "  ";

            const descriptionElement = document.createElement("span");
            descriptionElement.innerHTML = data.description + "  ";

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("onclick", `deleteTodo(${data.id})`);
            console.log(data.id)

            childElement.appendChild(titleElement);
            childElement.appendChild(descriptionElement);
            childElement.appendChild(deleteButton);

            parentElement.appendChild(childElement);
            parentElement.appendChild(document.createElement("br"));

        })
    })
}

function deleteTodo(todoId) {
    fetch(`http://localhost:3000/todos/${todoId}`, {
        method: "DELETE",
    }).then((resp) => {
        if (resp.ok) {
            const todoElementToRemove = document.getElementById(`todo_${todoId}`);
            if (todoElementToRemove) {
                todoElementToRemove.remove();
            } else {
                console.error(`Todo with ID ${todoId} not found in the UI.`);
            }
        } else {
            console.error(`Failed to delete todo with ID ${todoId}.`);
        }
    });
}
