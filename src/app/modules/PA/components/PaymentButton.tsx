import { Backdrop, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { numberWithCommas } from "../../_common/helpersFunction";
import usePaymentButtonHook from "../hook/PaymentButton.hook";
import useBillPaymentDetailsHook from "../hook/BillPaymentDetails.hook";

interface PaymentButtonProps {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
}

const PaymentButton = ({ billPaymentData }: PaymentButtonProps) => {
    const { premiumDebt } = billPaymentData?.data ?? {};
    const { handleBillPaymentPDFDownload, isPDFDownloading } = useBillPaymentDetailsHook({ billPaymentData });
    const { handlePayment, isChillpayLoading } = usePaymentButtonHook({
        billPaymentData,
        handleBillPaymentPDFDownload,
    });

    const isLoading = isChillpayLoading || isPDFDownloading;

    return (
        <Paper
            elevation={2}
            sx={{
                boxShadow: 2,
                borderRadius: 2,
                mt: 2,
                border: "1px solid #1DB0E6",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                textAlign: "center",
            }}
        >
            <Grid container alignItems="stretch">
                <Grid item xs={8} sx={{ pl: 3.5, pt: 1, pb: 1 }}>
                    <Typography sx={{ fontSize: 16, textAlign: "right", mr: 1 }}>สรุปยอดชำระเงิน</Typography>
                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "right",
                            mr: 1,
                            color: "#1DB0E6",
                        }}
                    >
                        {numberWithCommas(premiumDebt as number)} บาท
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        fullWidth
                        disabled={isLoading}
                        onClick={handlePayment}
                        sx={{
                            height: "100%",
                            textTransform: "none",
                            color: "#fff",
                            borderRadius: 2,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            backgroundColor: "#0095FF",
                            fontSize: 17,
                            "&:hover": { backgroundColor: "#007ACC" },
                        }}
                    >
                        {isLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "ชำระเงิน"}
                    </Button>
                </Grid>
            </Grid>
            <Backdrop open={isChillpayLoading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Paper>
    );
};

export default PaymentButton;
