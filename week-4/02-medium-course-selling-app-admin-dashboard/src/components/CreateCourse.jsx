import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [course, setCourse] = React.useState({
        title: "",
        description: "",
        price: "",
    });

    const handleInputChange = (e) => {
        setCourse((oldValue) => {
            return { ...oldValue, [e.target.name]: e.target.value };
        });
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#eeeeee",
                display: "grid",
                placeItems: "center",
            }}
        >
            <div style={{ marginTop: -100 }}>
                <Typography align={"center"} variant="h4">
                    Create New Course
                </Typography>
                <Card variant="outlined" style={{ padding: 20, width: 300 }}>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        type={"text"}
                        name="title"
                        value={course.title}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        onClick={() => console.log(course)}
                    >
                        Create Course
                    </Button>
                </Card>
            </div>
        </div>
    );
}
export default CreateCourse;
