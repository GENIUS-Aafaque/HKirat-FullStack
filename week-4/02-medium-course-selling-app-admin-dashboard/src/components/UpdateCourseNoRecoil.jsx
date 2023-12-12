import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";

function UpdateCourseNoRecoil() {
    const [course, setCourse] = useState({
        title: "",
        description: "",
        imgLink: "",
        price: 0,
    });
    const { courseId } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:3000/admin/courses", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setCourse(response.data.courses.find((c) => c.id == courseId));
            })
            .catch(() => console.log("error in fetching"));
    }, [courseId]);

    if (course && course.title) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 80,
                    backgroundColor: "#eeeeee",
                    height: "100vh",
                }}
            >
                <Typography variant="h3">Update Course</Typography>
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 80,
                        paddingTop: 20,
                    }}
                >
                    <CourseCard course={course}></CourseCard>
                    <UpdateCourseCard
                        courseId={courseId}
                        course={course}
                        setCourse={setCourse}
                    ></UpdateCourseCard>
                </div>
            </div>
        );
    } else {
        return (
            <Typography align="center" variant="h4" style={{ paddingTop: 100 }}>
                No Courses Found
            </Typography>
        );
    }
}

function CourseCard(props) {
    const course = props.course;
    return (
        <Card variant="outlined" style={{ width: 300, padding: 12 }}>
            <Typography variant="h6">{course.title}</Typography>
            <br />
            <Typography variant="subtitle">{course.description}</Typography>
            {course.imgLink ? <img src={course.imgLink} /> : null}
            <br />
            <Typography variant="subtitle">
                Price : Rs. {course.price}
            </Typography>
        </Card>
    );
}

function UpdateCourseCard(props) {
    const course = props.course;
    return (
        <div>
            <Card variant="outlined" style={{ padding: 20, width: 300 }}>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    type={"text"}
                    name="title"
                    value={course.title}
                    onChange={(e) => {
                        props.setCourse((oldValue) => {
                            return {
                                ...oldValue,
                                [e.target.name]: e.target.value,
                            };
                        });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    type={"text"}
                    name="description"
                    value={course.description}
                    onChange={(e) => {
                        props.setCourse((oldValue) => {
                            return {
                                ...oldValue,
                                [e.target.name]: e.target.value,
                            };
                        });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Image Link"
                    variant="outlined"
                    type={"text"}
                    name="imgLink"
                    value={course.imgLink}
                    onChange={(e) => {
                        props.setCourse((oldValue) => {
                            return {
                                ...oldValue,
                                [e.target.name]: e.target.value,
                            };
                        });
                    }}
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    label="Price"
                    variant="outlined"
                    type={"number"}
                    name="price"
                    value={course.price}
                    onChange={(e) => {
                        props.setCourse((oldValue) => {
                            return {
                                ...oldValue,
                                [e.target.name]: e.target.value,
                            };
                        });
                    }}
                />
                <br />
                <br />
                <Button
                    variant="contained"
                    onClick={() => {
                        axios.put(
                            `http://localhost:3000/admin/courses/${props.courseId}`,
                            course,
                            {
                                headers: {
                                    authorization:
                                        "Bearer " +
                                        localStorage.getItem("token"),
                                },
                            }
                        );
                        alert("Course Updated Succeccfully");
                    }}
                >
                    Update Course
                </Button>
            </Card>
        </div>
    );
}

export default UpdateCourseNoRecoil;
