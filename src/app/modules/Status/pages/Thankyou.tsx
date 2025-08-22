import { MainLayout } from "../../_common/commonDesign";
import { Box, Typography, Card, CardContent, Divider, Button, keyframes } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import useThankyouHook from "../hook/Thankyou.hook";
import { formatDateString, numberWithCommas } from "../../_common/helpersFunction";
import Loading from "./Loading";
import Error from "./Error";

const Thankyou = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useThankyouHook();
    const { refDebHeader, phoneNo } = data?.data?.[0] ?? {};
    const { premiumDebt, transactionDatetime, b } = refDebHeader ?? {};

    if (isLoading) return <Loading />;

    if (error) return <Error />;

    // Animation keyframes for success icon
    const successAnimation = keyframes`
        0% {
            transform: scale(0) rotate(-180deg);
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

    const handleFinish = () => {
        navigate("/"); // Navigate to home or wherever you want
    };

    const thankYouContent = (
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
                    boxShadow: "0 8px 32px rgba(26, 240, 18, 0.1)",
                    borderRadius: 3,
                    overflow: "visible",
                    border: "1px solid #4CAF50",
                }}
            >
                <CardContent
                    sx={{
                        textAlign: "center",
                        padding: { xs: 3, md: 4 },
                        position: "relative",
                    }}
                >
                    {/* Success Icon */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 3,
                        }}
                    >
                        <CheckCircleIcon
                            sx={{
                                fontSize: 80,
                                color: "#4CAF50",
                                filter: "drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))",
                                animation: `${successAnimation} 0.8s ease-out`,
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
                        ขอบคุณสำหรับการชำระเงิน
                    </Typography>

                    {/* Amount */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            color: "#4CAF50",
                            mb: 4,
                            fontSize: { xs: "1.75rem", md: "2.125rem" },
                        }}
                    >
                        {numberWithCommas(premiumDebt as number)} บาท
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Payment Details */}
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
                                วันที่ชำระเงิน
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#4CAF50",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                {formatDateString(
                                    transactionDatetime?.format?.("YYYY-MM-DD") ?? String(transactionDatetime ?? "-"),
                                    "DD MMM BBBB"
                                )}
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
                                เลขที่อ้างอิง
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#4CAF50",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                {b || "-"}
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
                                รับข้อความยืนยันการชำระเงินทาง SMS
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#4CAF50",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                {phoneNo || "-"}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Support Message */}
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            mb: 3,
                            lineHeight: 1.6,
                        }}
                        fontWeight={"bold"}
                    >
                        หากมีข้อสงสัย กรุณาติดต่อ Call Center 1434
                    </Typography>

                    {/* Finish Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleFinish}
                        sx={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            py: 1.5,
                            fontSize: "1rem",
                            fontWeight: "bold",
                            borderRadius: 2,
                            textTransform: "none",
                            boxShadow: "0 4px 16px rgba(76, 175, 80, 0.3)",
                            "&:hover": {
                                backgroundColor: "#388e3c",
                                boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                            },
                        }}
                    >
                        เสร็จสิ้น
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );

    return <MainLayout children={thankYouContent} />;
};

export default Thankyou;
