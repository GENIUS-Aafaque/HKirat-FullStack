import React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate = useNavigate();
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                backgroundColor: "#dddddd",
                borderBottom: "2px solid #bbbbbb",
            }}
        >
            <div>
                <Typography variant="h4">COURZERO</Typography>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate("/register")}
                >
                    Sign Up
                </Button>
                <Button variant="contained" onClick={() => navigate("/login")}>
                    Sign In
                </Button>
            </div>
        </div>
    );
}

export default Appbar;
