import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    return (
        <div
            style={{
                display: "grid",
                justifyContent: "center",
                paddingTop: 200,
            }}
        >
            <Card
                variant="outlined"
                style={{
                    width: 400,
                    padding: 40,
                    outlineWidth: 4,
                }}
            >
                <Typography
                    variant="h4"
                    style={{ flex: "1", color: "#aaaaaa" }}
                >
                    <u>Welcome to COURZERO!</u>
                </Typography>
                <br />
                <br />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 64,
                    }}
                >
                    <Button variant="contained" size="large">
                        Register
                    </Button>
                    <Button variant="contained" size="large">
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default Landing;
