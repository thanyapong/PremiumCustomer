import { Alert, Box, Grid, Snackbar, Typography } from "@mui/material";
import PaymentMethodButton from "../../CustomerPayment/components/PaymentMethodButton";
import usePaymentMethodSelectorHook from "../hook/PaymentMethodSelector.hook";
import { Buttons } from "../../_common/commonDesign";
import { memo, useMemo } from "react";
import CounterBillDialog from "./CounterBillDialog";
import CenpayDialog from "./CenpayDialog";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { useNavigate } from "react-router-dom";
import { InquiryDto_ResponseServiceResponse } from "../../../api/prmchillpayApi.Client";

const qrCodeImage: string = "/images/PaymentMethods/qrcode.png";
const counterBankImage: string = "/images/PaymentMethods/counterBank.png";
const counterBillImage: string = "/images/PaymentMethods/counterBill.png";
const cenpayImage: string = "/images/PaymentMethods/cenpay.png";
const bpCounterImage: string = "/images/PaymentMethods/bpCounter.png";
const counterCenpayImage: string = "/images/PaymentMethods/counterCenpay.png";

type PaymentMethodSelectProps = {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
    inquiryData: InquiryDto_ResponseServiceResponse | undefined;
};

const PaymentMethodSelector = memo(({ billPaymentData, inquiryData }: PaymentMethodSelectProps) => {
    const navigate = useNavigate();
    const {
        paymentMethod,
        handlePaymentMethodChange,
        handlePaymentMethodConfirm,
        state,
        handleSnackBarClose,
        handleDisableMethod,
        summaryDetailCode,
    } = usePaymentMethodSelectorHook({ billPaymentData, inquiryData });

    const { vertical, horizontal, open } = state;

    const paymentMethods = useMemo(
        () => [
            {
                id: 1,
                text: "ชำระผ่าน QR Code / Barcode",
                details: "หมายเหตุ: ยอดชำระขั้นต่ำมากกว่า 0 บาทและยอดชำระสูงสุดได้ไม่เกิน 2,000,000.00 บาท / บิล",
                startIcon: (
                    <Box
                        component="img"
                        src={qrCodeImage}
                        alt="QR Code / Barcode"
                        loading="lazy"
                        sx={{ width: 40, height: 40 }}
                    />
                ),
            },
            {
                id: 2,
                text: "ชำระผ่าน เคาน์เตอร์ธนาคาร",
                details: "หมายเหตุ: ยอดชำระขั้นต่ำ 100 บาทและไม่จำกัดยอดชำระสูงสุด / บิล",
                startIcon: (
                    <Box
                        component="img"
                        src={counterBankImage}
                        alt="counterBankImage"
                        loading="lazy"
                        sx={{ width: 40, height: 40 }}
                    />
                ),
            },
            {
                id: 3,
                text: "ชำระผ่าน เคาน์เตอร์บิล",
                details: "หมายเหตุ: ยอดชำระขั้นต่ำ 100 บาท และยอดชำระสูงสุดตามผู้ให้บริการ",
                startIcon: (
                    <Box
                        component="img"
                        src={counterBillImage}
                        alt="counterBillImage"
                        loading="lazy"
                        sx={{ width: 40, height: 40 }}
                    />
                ),
                detailIcon: bpCounterImage,
            },
            {
                id: 4,
                text: "ชำระผ่าน Cenpay",
                details: "หมายเหตุ: ยอดชำระขั้นต่ำ 100 บาทและยอดชำระสูงสุดได้ไม่เกิน 49,000.00 บาท / บิล",
                startIcon: (
                    <Box
                        component="img"
                        src={cenpayImage}
                        alt="cenpayImage"
                        loading="lazy"
                        sx={{ width: 60, height: 27, mr: -2.5 }}
                    />
                ),
                detailIcon: counterCenpayImage,
            },
        ],
        []
    );

    let snackBarMessage = "";

    if (paymentMethod === 3) snackBarMessage = "หากชำระผ่าน เคาน์เตอร์บิล จะไม่สามารถเปลี่ยนวิธีการชำระเป็น Cenpay ได้";
    if (paymentMethod === 4) snackBarMessage = "หากชำระผ่าน Cenpay จะไม่สามารถเปลี่ยนวิธีการชำระเป็น เคาน์เตอร์บิล ได้";

    return (
        <>
            <Box sx={{ width: 500 }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleSnackBarClose}
                    message={snackBarMessage}
                    key={vertical + horizontal}
                    autoHideDuration={3000}
                >
                    <Alert
                        severity="warning"
                        variant="outlined"
                        sx={{ width: "100%", backgroundColor: "#fff", color: "#FFA117" }}
                    >
                        {snackBarMessage}
                    </Alert>
                </Snackbar>
            </Box>
            {paymentMethods.map((method, index) => (
                <PaymentMethodButton
                    key={method.id}
                    isSelected={paymentMethod === method.id}
                    onClick={() => handlePaymentMethodChange(method.id)}
                    isLast={index === paymentMethods.length - 1}
                    startIcon={method.startIcon}
                    disabled={handleDisableMethod(method.id)}
                    isDisabled={handleDisableMethod(method.id)}
                >
                    <Grid>
                        <Typography sx={{ fontSize: 14 }}>{method.text}</Typography>
                        <Typography sx={{ fontSize: 12, color: "#666", mt: 0.5 }}>{method.details}</Typography>
                        {method.detailIcon && (
                            <Box
                                component="img"
                                src={method.detailIcon}
                                alt="Detail Icon"
                                loading="lazy"
                                sx={{
                                    ml: -0.6,
                                    mt: 1,
                                    display: "block",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                }}
                            />
                        )}
                    </Grid>
                </PaymentMethodButton>
            ))}

            <Grid container justifyContent="center" item>
                <Grid item xs={12} sx={{ textAlign: "center", mt: 1 }}>
                    <Buttons
                        fullWidth
                        onClick={() => handlePaymentMethodConfirm(paymentMethod)}
                        sx={{ backgroundColor: "#1db1e7" }}
                        disabled={!paymentMethod}
                        size="large"
                    >
                        ยืนยัน
                    </Buttons>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                    <Buttons
                        fullWidth
                        onClick={() => navigate(`/pa/${summaryDetailCode}`)}
                        variant="outlined"
                        size="large"
                        sx={{ color: "#1db1e7", backgroundColor: "#fff" }}
                    >
                        ยกเลิก
                    </Buttons>
                </Grid>
            </Grid>
            <CounterBillDialog />
            <CenpayDialog />
        </>
    );
});

PaymentMethodSelector.displayName = "PaymentMethodSelector";

export default PaymentMethodSelector;
