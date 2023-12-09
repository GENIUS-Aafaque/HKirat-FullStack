import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@mui/material";

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
                    authorization: "Bearer " + localStorage.getItem("token"),
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
                        authorization:
                            "Bearer " + localStorage.getItem("token"),
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
            <Typography
                align="center"
                variant="h4"
                style={{ marginTop: 24, marginBottom: 20 }}
            >
                Show Courses Page
            </Typography>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 24,
                    justifyContent: "center",
                }}
            >
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
        </div>
    );
}

function Course(props) {
    return (
        <Card variant="outlined" style={{ width: 300, padding: 12 }}>
            <Typography variant="h6">{props.title}</Typography>
            <br />
            <Typography variant="subtitle">{props.description}</Typography>
            <Typography variant="subtitle">{props.price}</Typography>
        </Card>
    );
}

export default ShowCourses;
