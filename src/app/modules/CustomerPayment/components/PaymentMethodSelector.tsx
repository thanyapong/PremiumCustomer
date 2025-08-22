import { Grid, Box } from "@mui/material";
import { Buttons } from "../../_common/commonDesign";
import usePaymentMethodSelectorHook from "../hooks/PaymentMethodSelector.hook";
import PaymentMethodButton from "./PaymentMethodButton";
import { useNavigate } from "react-router-dom";

const qrCodeImage: string = "/images/PaymentMethods/qrcode.png";
const creditCardsImage: string = "/images/PaymentMethods/creditCards.png";
const visaMasterCardImage: string = "/images/PaymentMethods/visa-master.png";

const PaymentMethodSelector = () => {
    const navigate = useNavigate();
    const { paymentMethod, handlePaymentMethodChange, handlePaymentMethodConfirm, summaryDetailCode } =
        usePaymentMethodSelectorHook();

    const paymentMethods = [
        {
            id: 1,
            text: "Bill payment/QR/Barcode",
            startIcon: <Box component="img" src={qrCodeImage} alt="QR Code" sx={{ width: 40, height: 40 }} />,
        },
        {
            id: 2,
            text: "บัตรเครดิต/เดบิต",
            startIcon: <Box component="img" src={creditCardsImage} alt="Credit Cards" sx={{ width: 40, height: 40 }} />,
            endIcon: (
                <Box
                    component="img"
                    src={visaMasterCardImage}
                    alt="Visa MasterCard"
                    sx={{ width: "auto", height: { xs: 20, sm: 25, lg: 20 } }}
                />
            ),
        },
    ];

    return (
        <>
            {paymentMethods.map((method, index) => (
                <PaymentMethodButton
                    key={method.id}
                    isSelected={paymentMethod === method.id}
                    onClick={() => handlePaymentMethodChange(method.id)}
                    isLast={index === paymentMethods.length - 1}
                    startIcon={method.startIcon}
                    endIcon={method.endIcon}
                >
                    {method.text}
                </PaymentMethodButton>
            ))}

            <Grid container justifyContent="center" item>
                <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
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
                        onClick={() => navigate(`/cp/${summaryDetailCode}`)}
                        variant="outlined"
                        size="large"
                        sx={{ color: "#1db1e7", backgroundColor: "#fff" }}
                    >
                        ยกเลิก
                    </Buttons>
                </Grid>
            </Grid>
        </>
    );
};

export default PaymentMethodSelector;
