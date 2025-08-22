import { MainLayout } from "../../_common/commonDesign";
import { Box, Typography, Card, CardContent, Divider, Button, keyframes } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useNavigate, useParams } from "react-router-dom";

const Fail = () => {
    const navigate = useNavigate();
    const { summaryDetailCode } = useParams();

    // Animation keyframes for error icon
    const errorAnimation = keyframes`
        0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.2) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    `;

    // Shake animation for the card
    const shakeAnimation = keyframes`
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    `;

    const handleRetry = () => {
        navigate(`/cp/${summaryDetailCode}`); // Go back to previous page
    };

    const handleHome = () => {
        navigate("/");
    };

    const failContent = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                padding: { xs: 2, md: 4 },
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Card
                sx={{
                    maxWidth: 500,
                    width: "100%",
                    boxShadow: "0 8px 32px rgba(255, 82, 82, 0.2)",
                    borderRadius: 3,
                    overflow: "visible",
                    border: "1px solid #ff5252",
                    animation: `${shakeAnimation} 0.5s ease-in-out`,
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        padding: { xs: 3, md: 4 },
                        position: "relative",
                    }}
                >
                    {/* Error Icon */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 3,
                        }}
                    >
                        <ErrorIcon
                            sx={{
                                fontSize: 80,
                                color: "#ff5252",
                                filter: "drop-shadow(0 4px 8px rgba(255, 82, 82, 0.3))",
                                animation: `${errorAnimation} 0.8s ease-out`,
                                animationFillMode: "both",
                            }}
                        />
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#333",
                            mb: 3,
                            fontSize: { xs: "1.5rem", md: "1.75rem" },
                        }}
                    >
                        การชำระเงินไม่สำเร็จ
                    </Typography>

                    {/* Error Message */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "#ff5252",
                            mb: 4,
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                        }}
                    >
                        เกิดข้อผิดพลาดในการดำเนินการ
                    </Typography>

                    {/* <Divider sx={{ mb: 3 }} /> */}

                    {/* Error Details */}
                    {/* <Box sx={{ textAlign: "left", mb: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                                flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: 1, sm: 0 },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#666",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                วันที่ทำรายการ
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ff5252",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                {formatDateString(new Date().toISOString(), "DD MMM BBBB HH:mm")}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                                flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: 1, sm: 0 },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#666",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                รหัสข้อผิดพลาด
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ff5252",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    fontFamily: "monospace",
                                }}
                            >
                                ERR_PAYMENT_FAILED_001
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: 1, sm: 0 },
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#666",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                สาเหตุที่เป็นไปได้
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ff5252",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    textAlign: { xs: "left", sm: "right" },
                                }}
                            >
                                เครือข่ายไม่เสียร์ / ข้อมูลไม่ถูกต้อง
                            </Typography>
                        </Box>
                    </Box> */}

                    <Divider sx={{ mb: 3 }} />

                    {/* Support Message */}
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            mb: 3,
                            lineHeight: 1.6,
                            color: "#666",
                        }}
                        fontWeight={"bold"}
                    >
                        หากปัญหายังคงมีอยู่ กรุณาติดต่อ Call Center 1434
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleRetry}
                            sx={{
                                backgroundColor: "#ff5252",
                                color: "white",
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow: "0 4px 16px rgba(255, 82, 82, 0.3)",
                                "&:hover": {
                                    backgroundColor: "#f44336",
                                    boxShadow: "0 6px 20px rgba(255, 82, 82, 0.4)",
                                },
                            }}
                        >
                            ลองใหม่อีกครั้ง
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleHome}
                            sx={{
                                color: "#666",
                                borderColor: "#666",
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                    borderColor: "#333",
                                    color: "#333",
                                },
                            }}
                        >
                            กลับหน้าแรก
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

    return <MainLayout children={failContent} />;
};

export default Fail;
