"use client";

import Register from "@/features/auth/components/Register";
import Grid from "@mui/material/Grid";

export default function RegisterPage() {
    return (
        <Grid container
         spacing={2}
         sx={{
            alignItems: "center",
            justifyContent: "center"
         }} >
            <Register />
        </Grid>
    );
}