import React from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [course, setCourse] = React.useState({
        title: "",
        description: "",
        price: 0,
    });

    const handleInputChange = (e) => {
        setCourse((oldValue) => {
            return { ...oldValue, [e.target.name]: e.target.value };
        });
    };

    return (
        <div>
            <h1>Create Course Page</h1>
            <input
                type={"text"}
                name="title"
                value={course.title}
                onChange={handleInputChange}
            />
            <textarea
                name="description"
                value={course.description}
                onChange={handleInputChange}
            />
            <input
                type={"number"}
                name="price"
                value={course.price}
                onChange={handleInputChange}
            />
            <button onClick={() => console.log(course)}>Create Course</button>
        </div>
    );
}
export default CreateCourse;
