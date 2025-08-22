import { Paper, Typography, Box } from "@mui/material";

type PaymentMethodPaperProps = {
    paymentMethodSelected: number;
};

const qrCodeImage: string = "/images/PaymentMethods/qrcode.png";
const creditCardsImage: string = "/images/PaymentMethods/creditCards.png";
const visaMasterCardImage: string = "/images/PaymentMethods/visa-master.png";

const PaymentMethodPaper = ({ paymentMethodSelected }: PaymentMethodPaperProps) => {
    const getPaymentMethodInfo = () => {
        switch (paymentMethodSelected) {
            case 1:
                return {
                    icon: qrCodeImage,
                    text: "Bill payment/QR/Barcode",
                };
            case 2:
                return {
                    icon: creditCardsImage,
                    text: "บัตรเครดิต/เดบิต",
                    endIcon: visaMasterCardImage,
                };
            default:
                return null;
        }
    };

    const paymentInfo = getPaymentMethodInfo();

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
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
                gap: { xs: 1.5, sm: 2 },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
                <Box
                    component="img"
                    src={paymentInfo.icon}
                    alt="Payment Method"
                    sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        display: "block",
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        color: "#000",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        ml: 5,
                    }}
                >
                    {paymentInfo.text}
                </Typography>
            </Box>

            {paymentInfo.endIcon && (
                <Box
                    component="img"
                    src={paymentInfo.endIcon}
                    alt="Visa MasterCard"
                    sx={{
                        width: "auto",
                        height: { xs: 20, sm: 25, lg: 20 },
                        display: "block",
                    }}
                />
            )}
        </Paper>
    );
};

export default PaymentMethodPaper;
