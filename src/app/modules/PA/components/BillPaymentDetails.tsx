import { Box, Grid, Paper, Typography } from "@mui/material";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { formatDateString, numberWithCommas } from "../../_common/helpersFunction";
import useBillPaymentDetailsHook from "../hook/BillPaymentDetails.hook";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import { useNavigate } from "react-router";
import { Buttons } from "../../_common/commonDesign";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type BillPaymentDetailsProps = {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
};

const BillPaymentDetails = ({ billPaymentData }: BillPaymentDetailsProps) => {
    const navigate = useNavigate();
    const { summaryDetailCode, scanCodeType, handleScanCodeGeneration, handleScanCodeTypeChange } =
        useBillPaymentDetailsHook({
            billPaymentData,
        });
    const { bill, applicationCode, payerName, payablePeriodTo, premiumDebt, ref1, ref2 } = billPaymentData?.data ?? {};

    const labelSx = { fontSize: { xs: 12, lg: 14 } };
    const valueSx = { fontSize: { xs: 12, lg: 14 }, color: "#757575" };
    const billDetails = [
        { label: "หมายเลขบิล :", value: bill ?? "-" },
        { label: "AppID :", value: applicationCode ?? "-" },
        { label: "ชื่อสถานศึกษา :", value: payerName ?? "-" },
        {
            label: "วันที่สิ้นสุดการชำระเบี้ย :",
            value: payablePeriodTo ? formatDateString(payablePeriodTo.toString(), "DD/MM/BBBB HH:mm น.") : "-",
        },
        { label: "ยอดชำระ :", value: `${numberWithCommas(premiumDebt as number) ?? "-"} บาท`, highlight: true },
        { label: "หมายเลขอ้างอิง (Ref. 1) :", value: ref1 ?? "-" },
        { label: "หมายเลขอ้างอิง (Ref. 2) :", value: ref2 ?? "-" },
    ];
    const buttons = [
        {
            text: `ชำระเงินด้วย ${scanCodeType !== 1 ? "QR Code" : "Barcode"}`,
            icon: scanCodeType === 1 ? "barcode" : "qrcode",
            colorType: "success",
            onClick: () => handleScanCodeTypeChange(scanCodeType !== 2 ? 2 : 1),
        },
        {
            text: "ย้อนกลับ",
            variant: "outlined",
            sx: { color: "#1db0e6", backgroundColor: "#fff" },
            onClick: () => navigate(`/pa/${summaryDetailCode}`),
        },
    ];

    return (
        <>
            <Paper elevation={0} sx={{ width: "100%", borderRadius: 2, backgroundColor: "#0095FF" }}>
                <Typography sx={{ p: 2, color: "#fff", textAlign: "center" }}>
                    ใบแจ้งชำระเบี้ย (Bill Payment)
                </Typography>
                <Box
                    sx={{
                        p: { xs: 2, lg: 3 },
                        backgroundColor: "#fff",
                        border: "4px solid #0095FF",
                        borderTop: "none",
                    }}
                >
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
                                width={1.55}
                                height={108}
                                marginBottom={0}
                                value={handleScanCodeGeneration() as string}
                            />
                        )}
                    </Grid>
                    {billDetails.map(({ label, value, highlight }, idx) => (
                        <Grid container alignItems="center" sx={{ mt: idx === 0 ? 0 : 2 }} key={label}>
                            <Grid item xs={6}>
                                <Typography sx={labelSx}>{label}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography sx={highlight ? { ...valueSx, color: "#1db0e6" } : valueSx}>
                                    {value}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid container alignItems="center" sx={{ mt: 4, textAlign: "center" }}>
                        <Grid item xs={12}>
                            <Typography sx={labelSx}>ท่านสามารถชำระเงินผ่าน Mobile Application</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={labelSx}>ได้ทุกธนาคารโดยมีผลทันที</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            {buttons.map((button, idx) => (
                <Grid container justifyContent="center" sx={{ mt: 2 }} key={idx}>
                    <Grid item xs={12} sm={10} md={8} lg={7}>
                        <Buttons
                            fullWidth
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
