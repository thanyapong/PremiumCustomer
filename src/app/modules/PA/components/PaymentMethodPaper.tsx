import { Paper, Typography, Box } from "@mui/material";
import { memo, useMemo } from "react";

type PaymentMethodPaperProps = {
    paymentMethodSelected: number;
};

const qrCodeImage: string = "/images/PaymentMethods/qrcode.png";
const counterBankImage: string = "/images/PaymentMethods/counterBank.png";
const counterBillImage: string = "/images/PaymentMethods/counterBill.png";
const cenpayImage: string = "/images/PaymentMethods/cenpay.png";
const bpCounterImage: string = "/images/PaymentMethods/bpCounter.png";
const counterCenpayImage: string = "/images/PaymentMethods/counterCenpay.png";

const PaymentMethodPaper = memo(({ paymentMethodSelected }: PaymentMethodPaperProps) => {
    const getPaymentMethodInfo = useMemo(() => {
        switch (paymentMethodSelected) {
            case 1:
                return {
                    icon: qrCodeImage,
                    text: "ชำระผ่าน QR Code / Barcode",
                    details: "หมายเหตุ: ยอดชำระขั้นต่ำมากกว่า 0 บาทและยอดชำระสูงสุดได้ไม่เกิน 2,000,000.00 บาท / บิล",
                };
            case 2:
                return {
                    icon: counterBankImage,
                    text: "ชำระผ่าน เคาน์เตอร์ธนาคาร",
                    details: "หมายเหตุ: ยอดชำระขั้นต่ำ 100 บาทและไม่จำกัดยอดชำระสูงสุด / บิล",
                };
            case 3:
                return {
                    icon: counterBillImage,
                    text: "ชำระผ่าน เคาน์เตอร์บิล",
                    details: "หมายเหตุ: ยอดชำระขั้นต่ำ 100 บาท และยอดชำระสูงสุดตามผู้ให้บริการ",
                    detailIcon: bpCounterImage,
                };
            case 4:
                return {
                    icon: cenpayImage,
                    text: "ชำระผ่าน Cenpay",
                    details: "หมายเหตุ: ยอดชำระขั้นต่ำ 100 บาทและยอดชำระสูงสุดได้ไม่เกิน 49,000.00 บาท / บิล",
                    detailIcon: counterCenpayImage,
                };
            default:
                return null;
        }
    }, [paymentMethodSelected]);

    const paymentInfo = getPaymentMethodInfo;

    if (!paymentInfo || paymentMethodSelected === 0) {
        return null;
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                backgroundColor: "#E6F8FF",
                border: "2px solid #1db0e6",
                borderRadius: 2,
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: { xs: 1.5, sm: 2 },
            }}
        >
            <Box
                component="img"
                src={paymentInfo.icon}
                alt="Payment Method"
                loading="lazy"
                sx={{
                    width: paymentMethodSelected === 4 ? 60 : 40,
                    height: paymentMethodSelected === 4 ? 27 : 40,
                    display: "block",
                    mr: 0,
                }}
            />

            <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 14, color: "#000" }}>{paymentInfo.text}</Typography>
                <Typography sx={{ fontSize: 12, color: "#666", mt: 0.5, wordWrap: "break-word" }}>
                    {paymentInfo.details}
                </Typography>
                {paymentInfo.detailIcon && (
                    <Box
                        component="img"
                        src={paymentInfo.detailIcon}
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
            </Box>
        </Paper>
    );
});

PaymentMethodPaper.displayName = "PaymentMethodPaper";

export default PaymentMethodPaper;
