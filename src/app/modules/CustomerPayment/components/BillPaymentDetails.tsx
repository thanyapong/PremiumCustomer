import { Box, Grid, Paper, Typography, keyframes } from "@mui/material";
import {
    GetBillPaymentDto_ResponseServiceResponse,
    GetDebtDto_ResponseListServiceResponse,
} from "../../../api/prmApi.Client";
import { formatDateString, numberWithCommas } from "../../_common/helpersFunction";
import { Buttons, ContentBox } from "../../_common/commonDesign";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import useBillPaymentDetailsHook from "../hooks/BillPaymentDetails.hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

type BillPaymentDetailsProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_ResponseListServiceResponse; // Assuming debtData is part of the billPaymentData
};

const BillPaymentDetails = ({ billPaymentData, debtData }: BillPaymentDetailsProps) => {
    const navigate = useNavigate();
    const { summaryDetailCode } = useParams();
    const {
        imageRef,
        scanCodeType,
        isDownloading,
        isPDFDownloading,
        handleScanCodeGeneration,
        handleScanCodeTypeChange,
        handleImageDownload,
        handleBillPaymentPDFDownload,
    } = useBillPaymentDetailsHook({
        billPaymentData,
        debtData,
    });
    const { debtHeader, summaryHeaders } = billPaymentData?.data ?? {};
    const { payerName, premiumDebt, ref1, ref2 } = debtHeader ?? {};
    const { displayPayablePeriodTo } = summaryHeaders?.[0] ?? {};

    // Loading animation keyframes
    const dotAnimation = keyframes`
        0%, 20% { opacity: 0; }
        50% { opacity: 1; }
        80%, 100% { opacity: 0; }
    `;

    // Loading component
    const LoadingDots = () => (
        <Box component="span" sx={{ display: "inline-flex", alignItems: "center" }}>
            กำลังดาวน์โหลด
            <Box component="span" sx={{ ml: 0.5 }}>
                <Box
                    component="span"
                    sx={{
                        animation: `${dotAnimation} 1.5s infinite`,
                        animationDelay: "0s",
                        fontSize: "inherit",
                    }}
                >
                    .
                </Box>
                <Box
                    component="span"
                    sx={{
                        animation: `${dotAnimation} 1.5s infinite`,
                        animationDelay: "0.3s",
                        fontSize: "inherit",
                    }}
                >
                    .
                </Box>
                <Box
                    component="span"
                    sx={{
                        animation: `${dotAnimation} 1.5s infinite`,
                        animationDelay: "0.6s",
                        fontSize: "inherit",
                    }}
                >
                    .
                </Box>
            </Box>
        </Box>
    );

    // Consolidated styles
    const textStyle = { fontSize: 13 };
    const labelStyle = { ...textStyle, fontWeight: "bold" };
    const amountStyle = { ...textStyle, fontWeight: "bold", fontSize: 16, color: "#1DB0E6" };

    // Bill data array
    const billData = [
        { label: "ชื่อผู้ชำระเบี้ย :", value: payerName ?? "-" },
        {
            label: "วันที่สิ้นสุดการชำระ :",
            value: formatDateString(
                displayPayablePeriodTo?.format?.("YYYY-MM-DD") ?? String(displayPayablePeriodTo ?? ""),
                "DD/MM/BBBB"
            ),
        },
        { label: "ยอดชำระ :", value: `${numberWithCommas(premiumDebt || 0)} บาท`, isAmount: true },
        { label: "รหัสรับชำระ 1 :", value: ref1 ?? "-" },
        { label: "รหัสรับชำระ 2 :", value: ref2 ?? "-" },
    ];

    // Button configurations
    const buttons = [
        {
            text: `ชำระเงินด้วย ${scanCodeType !== 1 ? "QR Code" : "Barcode"}`,
            icon: scanCodeType === 1 ? "barcode" : "qrcode",
            colorType: "success",
            onClick: () => handleScanCodeTypeChange(scanCodeType !== 2 ? 2 : 1),
        },
        {
            text: isDownloading ? <LoadingDots /> : "Download QR / BarCode",
            icon: <FileDownloadIcon />,
            sx: { backgroundColor: "#0095FF" },
            onClick: () => handleImageDownload(),
            disabled: isDownloading,
        },
        {
            text: isPDFDownloading ? <LoadingDots /> : "Open Bill Payment",
            icon: <PictureAsPdfIcon />,
            sx: { backgroundColor: "#0095FF" },
            onClick: () => handleBillPaymentPDFDownload(),
            disabled: isPDFDownloading,
        },
        {
            text: "ย้อนกลับ",
            variant: "outlined",
            sx: { color: "#1db0e6", backgroundColor: "#fff" },
            onClick: () => navigate(`/cp/${summaryDetailCode}`),
        },
    ];

    return (
        <>
            {/* <div ref={imageRef}> */}
            <ContentBox
                sx={{
                    boxShadow: 0,
                    borderRadius: 2,
                    backgroundColor: "transparent",
                    border: "none",
                    padding: { xs: 0, lg: 3.5 },
                    mt: { xs: 2, lg: -2 },
                    mb: { xs: 2, lg: 0 },
                }}
            >
                <Paper elevation={0} sx={{ width: "100%", backgroundColor: "#0095FF" }} ref={imageRef}>
                    <Box
                        component="img"
                        src="/images/SiamSmile/Siamsmilelogo_man_white.png"
                        alt="Siam Smile Logo"
                        sx={{ margin: "auto", display: "block", width: "auto", height: 40 }}
                    />
                    <Box
                        sx={{
                            padding: { xs: 2, lg: 3.5 },
                            backgroundColor: "#fff",
                            border: "4px solid #0095FF",
                            borderTop: "none",
                        }}
                    >
                        {/* QR/Barcode */}
                        <Grid container justifyContent="center" sx={{ mb: 3 }}>
                            {scanCodeType === 1 ? (
                                <QRCodeCanvas
                                    value={handleScanCodeGeneration() as string}
                                    size={150}
                                    bgColor="#ffffff"
                                    fgColor="#00202e"
                                    level="H"
                                />
                            ) : (
                                <Barcode
                                    width={1.4}
                                    height={108}
                                    marginBottom={0}
                                    value={handleScanCodeGeneration() as string}
                                />
                            )}
                        </Grid>

                        {/* Bill Details */}
                        {billData.map(({ label, value, isAmount }, index) => (
                            <Grid container key={index} sx={{ mb: 1.5, textAlign: "left" }}>
                                <Grid item xs={6}>
                                    <Typography sx={labelStyle}>{label}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography sx={isAmount ? amountStyle : textStyle}>{value}</Typography>
                                </Grid>
                            </Grid>
                        ))}

                        <Typography sx={{ ...labelStyle, textAlign: "center", mb: -1.5 }}>
                            ท่านสามารถชำระเงินผ่าน Mobile Application
                            <br /> ได้ทุกธนาคารโดยมีผลทันที
                        </Typography>
                    </Box>
                </Paper>
            </ContentBox>
            {/* </div> */}

            {/* Buttons */}
            {buttons.map((button, index) => (
                <Grid container justifyContent="center" sx={{ mt: index === 0 ? 0 : 2 }} key={index}>
                    <Grid item xs={12} sm={10} md={8} lg={7}>
                        <Buttons
                            fullWidth
                            disabled={button.disabled}
                            startIcon={
                                typeof button.icon === "string" ? (
                                    <FontAwesomeIcon icon={button.icon as any} />
                                ) : (
                                    button.icon
                                )
                            }
                            sx={{ textTransform: "capitalize", ...button.sx }}
                            onClick={button.onClick}
                            variant={button.variant as any}
                            colorType={button.colorType as any}
                            size="large"
                        >
                            {button.text}
                        </Buttons>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

export default BillPaymentDetails;
