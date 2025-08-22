import { MainLayout } from "../../_common/commonDesign";
import { Box, Typography, Card, CardContent, Divider, Button, keyframes } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "../../_common/helpersFunction";
import useThankyouHook from "../hook/Thankyou.hook";
import Loading from "./Loading";
import Error from "./Error";

const Pending = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useThankyouHook();
    const { displayPayablePeriodTo } = data?.data?.[0]?.summaryHeaders ?? {};

    if (isLoading) return <Loading />;

    if (error) return <Error />;

    // Animation keyframes for pending icon
    const pendingAnimation = keyframes`
        0% {
            transform: rotate(0deg);
            opacity: 0.7;
        }
        50% {
            transform: rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: rotate(360deg);
            opacity: 0.7;
        }
    `;

    // Pulse animation for emphasis
    const pulseAnimation = keyframes`
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    `;

    // Fade in animation for the card
    const fadeInAnimation = keyframes`
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    const handleHome = () => {
        navigate("/");
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const pendingContent = (
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
                    boxShadow: "0 8px 32px rgba(255, 193, 7, 0.2)",
                    borderRadius: 3,
                    overflow: "visible",
                    border: "1px solid #ffc107",
                    animation: `${fadeInAnimation} 0.6s ease-out`,
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        padding: { xs: 3, md: 4 },
                        position: "relative",
                    }}
                >
                    {/* Pending Icon */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 3,
                        }}
                    >
                        <HourglassEmptyIcon
                            sx={{
                                fontSize: 80,
                                color: "#ffc107",
                                filter: "drop-shadow(0 4px 8px rgba(255, 193, 7, 0.3))",
                                animation: `${pendingAnimation} 2s linear infinite`,
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
                        การชำระเงินรอดำเนินการ
                    </Typography>

                    {/* Pending Message */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "#ffc107",
                            mb: 4,
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                            animation: `${pulseAnimation} 2s ease-in-out infinite`,
                        }}
                    >
                        กำลังตรวจสอบการชำระเงิน
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Pending Details */}
                    <Box sx={{ textAlign: "left", mb: 3 }}>
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
                                    color: "#ffc107",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                {formatDateString(
                                    displayPayablePeriodTo?.format?.("YYYY-MM-DD") ??
                                        String(displayPayablePeriodTo ?? "-"),
                                    "DD MMM BBBB"
                                )}
                            </Typography>
                        </Box>
                        {/* 
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
                                สถานะ
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ffc107",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                รอการยืนยัน
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
                                รหัสอ้างอิง
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ffc107",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    fontFamily: "monospace",
                                }}
                            >
                                PENDING_{new Date().getTime().toString().slice(-8)}
                            </Typography>
                        </Box> */}
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Information Message */}
                    <Box
                        sx={{
                            backgroundColor: "#fff8e1",
                            borderRadius: 2,
                            p: 2,
                            mb: 3,
                            border: "1px solid #ffc107",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                                color: "#f57f17",
                            }}
                            fontWeight={"bold"}
                        >
                            ⏳ กรุณารอสักครู่
                            <br />
                            ระบบกำลังตรวจสอบการชำระเงินของคุณ
                            <br />
                            โปรดอย่าปิดหน้าต่างนี้
                        </Typography>
                    </Box>

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
                        หากต้องการความช่วยเหลือ กรุณาติดต่อ Call Center 1434
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleRefresh}
                            sx={{
                                backgroundColor: "#ffc107",
                                color: "white",
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow: "0 4px 16px rgba(255, 193, 7, 0.3)",
                                "&:hover": {
                                    backgroundColor: "#ffb300",
                                    boxShadow: "0 6px 20px rgba(255, 193, 7, 0.4)",
                                },
                            }}
                        >
                            ตรวจสอบอีกครั้ง
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

    return <MainLayout children={pendingContent} />;
};

export default Pending;
