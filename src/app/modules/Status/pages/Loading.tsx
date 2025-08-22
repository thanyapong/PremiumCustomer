import { Typography, Box } from "@mui/material";
import { Header } from "../../_common/commonDesign";

const Loading = () => {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#fff",
                position: "relative",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                {/* Original loading image */}
                {/*
                <Box
                    component="img"
                    src="/images/Status/loading.png"
                    alt="Loading"
                    sx={{
                        width: { xs: 200, sm: 250, md: 280 },
                        height: { xs: 200, sm: 250, md: 280 },
                        objectFit: "contain",
                        animation: "pulse 2s ease-in-out infinite",
                        "@keyframes pulse": {
                            "0%, 100%": { opacity: 0.8, transform: "scale(1)" },
                            "50%": { opacity: 1, transform: "scale(1.05)" },
                        },
                    }}
                />
                */}

                {/* Modern Loading Animation */}
                <Box
                    sx={{
                        width: { xs: 200, sm: 250, md: 280 },
                        height: { xs: 200, sm: 250, md: 280 },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    {/* Outer spinning ring */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            border: "8px solid #e3f2fd",
                            borderTop: "8px solid #1976d2",
                            borderRadius: "50%",
                            animation: "spin 2s linear infinite",
                            "@keyframes spin": {
                                "0%": { transform: "rotate(0deg)" },
                                "100%": { transform: "rotate(360deg)" },
                            },
                        }}
                    />

                    {/* Inner pulsing dots */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: "#1976d2",
                                    borderRadius: "50%",
                                    animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
                                    "@keyframes bounce": {
                                        "0%, 80%, 100%": {
                                            transform: "scale(0)",
                                            opacity: 0.5,
                                        },
                                        "40%": {
                                            transform: "scale(1)",
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                        ))}
                    </Box>

                    {/* Middle rotating ring */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "70%",
                            height: "70%",
                            border: "4px solid transparent",
                            borderLeft: "4px solid #42a5f5",
                            borderRight: "4px solid #42a5f5",
                            borderRadius: "50%",
                            animation: "spin-reverse 1.5s linear infinite",
                            "@keyframes spin-reverse": {
                                "0%": { transform: "rotate(0deg)" },
                                "100%": { transform: "rotate(-360deg)" },
                            },
                        }}
                    />
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: "#1976d2",
                        fontSize: { xs: 18, sm: 20, md: 24 },
                        textAlign: "center",
                        position: "relative",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            right: -40,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 30,
                            height: 6,
                            background: "linear-gradient(90deg, transparent, #1976d2, transparent)",
                            borderRadius: 3,
                            animation: "loading 1.5s ease-in-out infinite",
                        },
                        "@keyframes loading": {
                            "0%": {
                                opacity: 0,
                                transform: "translateX(-20px)",
                            },
                            "50%": {
                                opacity: 1,
                                transform: "translateX(0px)",
                            },
                            "100%": {
                                opacity: 0,
                                transform: "translateX(20px)",
                            },
                        },
                    }}
                >
                    Loading
                    <Box
                        component="span"
                        sx={{
                            display: "inline-block",
                            ml: 1,
                            "&::before": {
                                content: '"."',
                                animation: "dots 1.5s steps(4, end) infinite",
                                "@keyframes dots": {
                                    "0%, 20%": {
                                        color: "transparent",
                                        textShadow: "0.25em 0 0 transparent, 0.5em 0 0 transparent",
                                    },
                                    "40%": {
                                        color: "#1976d2",
                                        textShadow: "0.25em 0 0 transparent, 0.5em 0 0 transparent",
                                    },
                                    "60%": {
                                        color: "#1976d2",
                                        textShadow: "0.25em 0 0 #1976d2, 0.5em 0 0 transparent",
                                    },
                                    "80%, 100%": {
                                        color: "#1976d2",
                                        textShadow: "0.25em 0 0 #1976d2, 0.5em 0 0 #1976d2",
                                    },
                                },
                            },
                        }}
                    />
                </Typography>
            </Box>
        </Box>
    );
};

export default Loading;
