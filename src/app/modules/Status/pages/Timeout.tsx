import { MainLayout } from "../../_common/commonDesign";
import { Box, Typography, Card, CardContent, Divider, Button, keyframes, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "../../_common/helpersFunction";
import useThankyouHook from "../hook/Thankyou.hook";
import Loading from "./Loading";
import Error from "./Error";

const Timeout = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useThankyouHook();
    const { displayPayablePeriodTo } = data?.data?.[0]?.summaryHeaders ?? {};

    if (isLoading) return <Loading />;

    if (error) return <Error />;

    // Animation keyframes for timeout icon
    const timeoutAnimation = keyframes`
        0% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.1) rotate(90deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    `;

    // Pulse animation for attention
    const pulseAnimation = keyframes`
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
    `;

    // Slide in animation for the card
    const slideInAnimation = keyframes`
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    const handleHome = () => {
        navigate("/");
    };

    const timeoutContent = (
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
                    animation: `${slideInAnimation} 0.6s ease-out`,
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        padding: { xs: 3, md: 4 },
                        position: "relative",
                    }}
                >
                    {/* Timeout Icon */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 3,
                        }}
                    >
                        <AccessTimeIcon
                            sx={{
                                fontSize: 80,
                                color: "#ffc107",
                                filter: "drop-shadow(0 4px 8px rgba(255, 193, 7, 0.3))",
                                animation: `${timeoutAnimation} 0.8s ease-out`,
                                animationFillMode: "both",
                            }}
                        />
                    </Box>

                    {/* Status Chip */}
                    <Chip
                        label="หมดเวลา"
                        sx={{
                            backgroundColor: "#fff3c4",
                            color: "#f57f17",
                            fontWeight: "bold",
                            mb: 2,
                            animation: `${pulseAnimation} 2s infinite`,
                        }}
                    />

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
                        หมดเวลาการชำระเงิน
                    </Typography>

                    {/* Timeout Message */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "#ffc107",
                            mb: 4,
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                        }}
                    >
                        บิลชำระเงินหมดอายุแล้ว
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Timeout Details */}
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
                                วันที่หมดเวลา
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
                                    "DD MMM BBBB HH:mm" + " น."
                                )}
                            </Typography>
                        </Box>

                        {/* <Box
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
                                ระยะเวลาที่กำหนด
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ffc107",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                15 นาที
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
                                รหัสเซสชัน
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ffc107",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    fontFamily: "monospace",
                                }}
                            >
                                TIMEOUT_{new Date().getTime().toString().slice(-8)}
                            </Typography>
                        </Box> */}
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Information Message */}
                    {/* <Box
                        sx={{
                            backgroundColor: "#fffde7",
                            borderRadius: 2,
                            p: 2,
                            mb: 3,
                            border: "1px solid #fff9c4",
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
                            ⏰ เหตุผลที่หมดเวลา
                            <br />
                            • เพื่อความปลอดภัยของรายการ
                            <br />
                            • ป้องกันการใช้งานที่ไม่ได้รับอนุญาต
                            <br />• รักษาข้อมูลการเงินให้ปลอดภัย
                        </Typography>
                    </Box> */}

                    {/* Instruction Message */}
                    {/* <Box
                        sx={{
                            backgroundColor: "#e3f2fd",
                            borderRadius: 2,
                            p: 2,
                            mb: 3,
                            border: "1px solid #bbdefb",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                                color: "#1565c0",
                            }}
                            fontWeight={"bold"}
                        >
                            💡 ขั้นตอนถัดไป
                            <br />
                            กรุณาเริ่มการชำระเงินใหม่อีกครั้ง
                            <br />
                            ข้อมูลของคุณยังคงปลอดภัยในระบบ
                        </Typography>
                    </Box> */}

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
                        {/* บิลหมดอายุแล้ว กรุณาติดต่อตัวแทนเพื่อเปิดบิลใหม่
                        <br />
                        หรือติดต่อ Call Center 1434 */}
                        หากต้องการความช่วยเหลือ กรุณาติดต่อ Call Center 1434
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleHome}
                            sx={{
                                backgroundColor: "#ffc107",
                                color: "#333",
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
                            กลับหน้าแรก
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

    return <MainLayout children={timeoutContent} />;
};

export default Timeout;
