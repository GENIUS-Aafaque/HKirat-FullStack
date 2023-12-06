import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowCourses() {
    const [courses, setCourses] = useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    useEffect(() => {
        axios
            .get("http://localhost:3000/admin/courses", {
                headers: {
                    username: "sameer",
                    password: 123,
                },
            })
            .then((response) => {
                setCourses(response.data.courses);
            })
            .catch(() => console.log("error in fetching"));
        setInterval(() => {
            axios
                .get("http://localhost:3000/admin/courses", {
                    headers: {
                        username: "sameer",
                        password: 123,
                    },
                })
                .then((response) => {
                    setCourses(response.data.courses);
                })
                .catch(() => console.log("error in fetching"));
        }, 1000);
    }, []);

    return (
        <div>
            <h1>Show Courses Page</h1>
            {courses.length !== 0
                ? courses.map((c) => {
                      return (
                          <Course
                              key={c.id}
                              title={c.title}
                              description={c.description}
                              price={c.price}
                          />
                      );
                  })
                : "No courses found :("}
        </div>
    );
}

function Course(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            {props.description}: {props.price}
        </div>
    );
}

export default ShowCourses;
