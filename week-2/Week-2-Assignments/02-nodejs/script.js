function getTodos() {
    fetch("http://localhost:3000/todos", {
        method: "GET"
    }).then((resp) => {
        resp.json().then(data => {
            for (let i = 0; i < data.length; i++) {
                const parentElement = document.getElementById("mainArea");

                const childElement = document.createElement("div");

                const titleElement = document.createElement("span");
                titleElement.innerHTML = data[i].title;

                const descriptionElement = document.createElement("span");
                descriptionElement.innerHTML = data[i].description;

                const deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";

                childElement.appendChild(titleElement);
                childElement.appendChild(descriptionElement);
                childElement.appendChild(deleteButton);

                parentElement.appendChild(childElement);
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

            const titleElement = document.createElement("span");
            titleElement.innerHTML = data[i].title;

            const descriptionElement = document.createElement("span");
            descriptionElement.innerHTML = data[i].description;

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";

            childElement.appendChild(titleElement);
            childElement.appendChild(descriptionElement);
            childElement.appendChild(deleteButton);

            parentElement.appendChild(childElement);

        })
    })
}