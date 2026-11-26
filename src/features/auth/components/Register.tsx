import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useRegisterMutation } from "@/features/auth/auth";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import type { NormalizedError } from "@/utils/error/errorType";
import { useRouter } from "next/navigation";
import VerifyModal from "@/features/auth/components/VerifyModal";
import CustomAlert from "@/app/components/shared/Alert/CustomAlert";

const Register = () => {
    const router = useRouter();

    const [register, { isLoading }] = useRegisterMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [verifyModalOpen, setVerifyModalOpen] = useState(false);
    const [registeredInfo, setRegisteredInfo] = useState({ email: "", phoneNumber: "" });


    const [fieldErrors, setFieldErrors] = useState<{
        email?: string;
        phoneNumber?: string;
    }>({});

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        severity: "success" | "error";
        message: string;
    }>({ open: false, severity: "success", message: "" });

    const handleClickRegister = async () => {
        setFieldErrors({}); // Reset field errors before making the request

        const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
        const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
        const phoneNumber = (document.getElementById("phoneNumber") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try {
            await register({ firstName, lastName, phoneNumber, email, password }).unwrap();

            setRegisteredInfo({ email, phoneNumber });
            setVerifyModalOpen(true);
            setSnackbar({ open: true, severity: "success", message: "Kayıt başarılı! Lütfen doğrulama için e-posta adresinizi kontrol edin." });
        } catch (error) {
            const normalizedError = error as NormalizedError;
            const code = normalizedError?.data?.code;
            const message = normalizedError?.data?.Message || "Kayıt başarısız!";

            if (code === "1002") {
                setFieldErrors({ email: message });
            } else if (code === "1003") {
                setFieldErrors({ phoneNumber: message });
            } else {
                setSnackbar({ open: true, severity: "error", message });
            }
        }
    };

    return (
        <Stack spacing={2}
            sx={{
                width: "100%",
                maxWidth: 360,
                mx: "auto"
            }} >
            <Typography variant="h4" component="h1" gutterBottom>
                Ad
            </Typography>
            <TextField fullWidth required id="firstName" label="Ad" variant="outlined" />

            <Typography variant="h4" component="h1" gutterBottom>
                Soyad
            </Typography>
            <TextField fullWidth required id="lastName" label="Soyad" variant="outlined" />

            <Typography variant="h4" component="h1" gutterBottom>
                Telefon Numarası
            </Typography>
            {fieldErrors.phoneNumber && (
                <Alert severity="error" sx={{ width: "100%" }}>
                    {fieldErrors.phoneNumber}
                </Alert>
            )}
            <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Telefon Numarası"
                variant="outlined"
                error={Boolean(fieldErrors.phoneNumber)}
                onChange={() => fieldErrors.phoneNumber &&
                    setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }))
                }
            />

            <Typography variant="h4" component="h1" gutterBottom>
                E-posta
            </Typography>
            {fieldErrors.email && (
                <Alert severity="error" sx={{ width: "100%" }}>
                    {fieldErrors.email}
                </Alert>
            )}
            <TextField
                fullWidth
                required
                id="email"
                label="E-posta"
                variant="outlined"
                error={Boolean(fieldErrors.email)}
                onChange={() => fieldErrors.email &&
                    setFieldErrors((prev) => ({ ...prev, email: undefined }))
                }
            />

            <Typography variant="h4" component="h1" gutterBottom>
                Şifre
            </Typography>
            <TextField required
                fullWidth
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
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />

            <Button variant="contained"
                size="large"
                disabled={isLoading}
                onClick={handleClickRegister}>
                Kayıt Ol
            </Button>
            <CustomAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            />
            <VerifyModal
                open={verifyModalOpen}
                email={registeredInfo.email}
                phoneNumber={registeredInfo.phoneNumber}
                onClose={() => setVerifyModalOpen(false)}
                onVerify={() => {
                    setVerifyModalOpen(false);
                    setSnackbar({
                        open: true,
                        severity: "success",
                        message: "Hesabınız başarıyla doğrulandı! Giriş sayfasına yönlendiriliyorsunuz."
                    });
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 3000)
                }}
            />
        </Stack>
    );
}

export default Register;