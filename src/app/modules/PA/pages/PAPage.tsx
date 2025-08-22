import usePAPageHook from "../hook/PAPage.hook";
import { Header, MainLayout } from "../../_common/commonDesign";
import Loading from "../../Status/pages/Loading";
import Error from "../../Status/pages/Error";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";
import ProductDetails from "../components/ProductDetails";
import PaymentSummary from "../components/PaymentSummary";
import { selectPASlice } from "../paSlice";
import { useAppSelector } from "../../../../redux";
import { ArrowRight } from "@mui/icons-material";
import BillSummary from "../components/BillSummary";
import PaymentButton from "../components/PaymentButton";
import PaymentMethodPaper from "../components/PaymentMethodPaper";
import { useMemo } from "react";
import dayjs from "dayjs";
import Thankyou from "../../Status/pages/Thankyou";
import BillCancelled from "../../Status/pages/BillCancelled";
import Timeout from "../../Status/pages/Timeout";

const APP_CONFIG = {
    images: {
        background: "/images/SiamSmile/BPbackground.png",
    },
};

const PAPage = () => {
    const {
        billPaymentData,
        isBillPaymentLoading,
        isBillPaymentError,
        isInquiryLoading,
        isInquiryError,
        handleRedirectPaymentMethod,
    } = usePAPageHook();
    const { paymentMethodSelected } = useAppSelector(selectPASlice);
    const { payablePeriodTo, paymentStatusId } = billPaymentData?.data ?? {};

    // Memoize loading and error states
    const isLoading = useMemo(() => isBillPaymentLoading || isInquiryLoading, [isBillPaymentLoading, isInquiryLoading]);

    const hasError = useMemo(() => isBillPaymentError || isInquiryError, [isBillPaymentError, isInquiryError]);

    // Memoize date calculations
    const { isExpired } = useMemo(() => {
        const local = dayjs(new Date()).local();
        const expire = dayjs(payablePeriodTo);
        return {
            localDate: local,
            expireDate: expire,
            isExpired: local > expire,
        };
    }, [payablePeriodTo]);

    if (isLoading) return <Loading />;
    if (hasError) return <Error />;

    // Check payment status and render appropriate component
    if (billPaymentData?.data) {
        if (paymentStatusId == 3) return <Thankyou />;
        else if (paymentStatusId === 5) return <BillCancelled />;
        else if (isExpired || paymentStatusId === 6) return <Timeout />;
    }

    return (
        <MainLayout
            headerComponent={<Header textHeader="สรุปยอดการชำระ" />}
            backgroundImage={APP_CONFIG.images.background}
            footerComponent={null} // Assuming no footer for this page
            footerCallCenter=""
            footerSocialLinks={[]}
            children={
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    // sx={{ minHeight: windowDimensions.height }}
                >
                    <Grid container justifyContent="center" alignItems="center" lg={4} sx={{ mt: 2.5 }}>
                        <Grid item xs={11} sm={9} md={7} lg={12}>
                            <ProductDetails billPaymentData={billPaymentData} />
                        </Grid>
                        <Grid item xs={11} sm={9} md={7} lg={12} sx={{ mt: 2, mb: 2 }}>
                            <PaymentSummary billPaymentData={billPaymentData} />
                        </Grid>
                        {paymentMethodSelected === 0 && (
                            <Grid item xs={11} sm={9} md={7} lg={12} sx={{ mb: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    endIcon={<ArrowRight />}
                                    sx={{ borderColor: "#0095FF", backgroundColor: "#0095FF", p: 3.5, pt: 1, pb: 1 }}
                                    onClick={() => handleRedirectPaymentMethod()}
                                >
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography textAlign={"start"} fontWeight={"bold"}>
                                                เลือกวิธีการชำระ
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Grid>
                        )}
                        {/* Selected Payment Method */}
                        {paymentMethodSelected > 0 && (
                            <Grid item xs={11} sm={9} md={7} lg={12} sx={{ mb: 2 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        backgroundColor: "#FFE6C9",
                                        boxShadow: 2,
                                        borderColor: "#e6991dff",
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        borderRadius: 2,
                                    }}
                                >
                                    <Grid container justifyContent={"space-between"} alignItems={"center"}>
                                        <Grid item>
                                            <Typography fontWeight={"bold"}>วิธีการชำระเงิน</Typography>
                                        </Grid>
                                        <Link
                                            component={"button"}
                                            onClick={handleRedirectPaymentMethod}
                                            style={{ color: "#2d93c0" }}
                                        >
                                            <Grid item>
                                                <Typography>เปลี่ยน {">"}</Typography>
                                            </Grid>
                                        </Link>
                                    </Grid>
                                    <PaymentMethodPaper paymentMethodSelected={paymentMethodSelected} />
                                </Paper>
                            </Grid>
                        )}
                        <Grid item xs={11} sm={9} md={7} lg={12}>
                            <BillSummary billPaymentData={billPaymentData} />
                        </Grid>
                        <Grid item xs={11} sm={9} md={7} lg={12} sx={{ mb: 2 }}>
                            <PaymentButton billPaymentData={billPaymentData} />
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    );
};

export default PAPage;
