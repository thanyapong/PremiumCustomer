import { Box, CircularProgress, Typography } from "@mui/material";

const SigninCallback = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress size={64} />
            <Typography variant="h6" component="h1" mt={2}>
                Loading...
            </Typography>
        </Box>
    );
};

export default SigninCallback;

