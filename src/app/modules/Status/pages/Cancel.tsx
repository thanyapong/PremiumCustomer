import { MainLayout } from "../../_common/commonDesign";
import { Box, Typography, Card, CardContent, Divider, Button, keyframes } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "../../_common/helpersFunction";
import useThankyouHook from "../hook/Thankyou.hook";
import Loading from "./Loading";
import Error from "./Error";

const Cancel = () => {
    const navigate = useNavigate();
    const { data, isLoading, error, summaryDetailCode } = useThankyouHook();
    const { displayPayablePeriodTo } = data?.data?.[0]?.summaryHeaders ?? {};

    if (isLoading) return <Loading />;

    if (error) return <Error />;

    // Animation keyframes for cancel icon
    const cancelAnimation = keyframes`
        0% {
            transform: scale(0) rotate(-90deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
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

    const handleContinue = () => {
        navigate(`/cp/${summaryDetailCode}`); // Go back to previous page
    };

    const handleHome = () => {
        navigate("/");
    };

    const cancelContent = (
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
                    boxShadow: "0 8px 32px rgba(255, 152, 0, 0.2)",
                    borderRadius: 3,
                    overflow: "visible",
                    border: "1px solid #ff9800",
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
                    {/* Cancel Icon */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 3,
                        }}
                    >
                        <CancelIcon
                            sx={{
                                fontSize: 80,
                                color: "#ff9800",
                                filter: "drop-shadow(0 4px 8px rgba(255, 152, 0, 0.3))",
                                animation: `${cancelAnimation} 0.8s ease-out`,
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
                        การชำระเงินถูกยกเลิก
                    </Typography>

                    {/* Cancel Message */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "#ff9800",
                            mb: 4,
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                        }}
                    >
                        รายการของคุณยังไม่ได้ชำระเงิน
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Cancel Details */}
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
                                    color: "#ff9800",
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
                                สถานะ
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#ff9800",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                }}
                            >
                                ยกเลิกโดยผู้ใช้
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
                                    color: "#ff9800",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    fontFamily: "monospace",
                                }}
                            >
                                CANCEL_{new Date().getTime().toString().slice(-8)}
                            </Typography>
                        </Box> */}
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Information Message */}
                    <Box
                        sx={{
                            backgroundColor: "#fff3e0",
                            borderRadius: 2,
                            p: 2,
                            mb: 3,
                            border: "1px solid #ffcc02",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                                color: "#e65100",
                            }}
                            fontWeight={"bold"}
                        >
                            💡 ข้อมูลของคุณยังคงอยู่ในระบบ
                            <br />
                            คุณสามารถกลับมาดำเนินการชำระเงินได้จนถึงเวลา 22:00 น. <br />
                            ของวันที่เปิดบิล
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
                            onClick={handleContinue}
                            sx={{
                                backgroundColor: "#ff9800",
                                color: "white",
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow: "0 4px 16px rgba(255, 152, 0, 0.3)",
                                "&:hover": {
                                    backgroundColor: "#f57c00",
                                    boxShadow: "0 6px 20px rgba(255, 152, 0, 0.4)",
                                },
                            }}
                        >
                            ดำเนินการต่อ
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

    return <MainLayout children={cancelContent} />;
};

export default Cancel;
