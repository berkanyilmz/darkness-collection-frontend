"use client";

import { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useLoginMutation } from "@/features/auth/auth";
import { Stack } from "@mui/material";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [login, {isLoading, isError, isSuccess}] = useLoginMutation();

    const handleClickLogin = async () => {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        await login({ email, password });
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Grid container rowSpacing={2} columnSpacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Stack spacing={2}>
                <Typography variant="h6" component="h6" gutterBottom>
                    E-Posta
                </Typography>
                <TextField required id="email" label="E-Posta" variant="outlined" />
                <Typography variant="h6" component="h6" gutterBottom>
                    Şifre
                </Typography>
                <TextField
                    required
                    id="password"
                    label="Şifre"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <Visibility fontSize="small" />
                                        ) : (
                                            <VisibilityOff fontSize="small" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button variant="contained" onClick={handleClickLogin} size="large">Giriş Yap</Button>
            </Stack>
                
        </Grid>
    );
};

export default Login;