import { Button, Grid, Paper, Typography } from "@mui/material";
import useCustomerPaymentPageHook from "../hooks/CustomerPaymentPage.hook";
import { Footer, HeaderWithPayerName, MainLayout } from "../../_common/commonDesign";
import Loading from "../../Status/pages/Loading";
import ProductList from "../components/ProductList";
import PaymentSummary from "../components/PaymentSummary";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useAppSelector } from "../../../../redux";
import { selectCustomerPaymentSlice } from "../customerPaymentSlice";
import { Link } from "@mui/material";
import PaymentMethodPaper from "../components/PaymentMethodPaper";
import BillSummary from "../components/BillSummary";
import Error from "../../Status/pages/Error";
import dayjs from "dayjs";
import Thankyou from "../../Status/pages/Thankyou";
import Timeout from "../../Status/pages/Timeout";
import BillCancelled from "../../Status/pages/BillCancelled";
import { useMemo, memo } from "react";

// Memoize APP_CONFIG to prevent recreation on every render
const APP_CONFIG = {
    images: {
        background: "/images/SiamSmile/BPbackground.png",
        header: "/images/SiamSmile/Siamsmilelogo_man_white.png",
    },
    footer: {
        callCenter: "Call Center โทร 1434",
        socialLinks: [
            {
                href: "https://www.facebook.com/siamsmilebroker/",
                src: "/images/SocialMedia/facebook.png",
                alt: "Facebook",
            },
            {
                href: "https://www.youtube.com/channel/UC-x4bdgWZCeYqJO5RBFkg7w",
                src: "/images/SocialMedia/youtube.png",
                alt: "YouTube",
            },
            {
                href: "https://line.me/R/ti/p/%40siamsmile",
                src: "/images/SocialMedia/line.png",
                alt: "LINE",
                width: 32.5,
                height: 32.5,
            },
            { href: "https://www.siamsmilebroker.co.th/", src: "/images/SocialMedia/siamsmile.png", alt: "Website" },
        ],
    },
};

const CustomerBillPayment = () => {
    const {
        billPaymentData,
        isLoadingBillPayment,
        debtData,
        isLoadingDebt,
        dcrDateData,
        isLoadingDcrDate,
        windowDimensions,
        isErrorBillPayment,
        isErrorDebt,
        isErrorDcrDate,
        handleRedirectPaymentMethod,
    } = useCustomerPaymentPageHook();
    const { paymentMethodSelected } = useAppSelector(selectCustomerPaymentSlice);

    // Memoize loading and error states
    const isLoading = useMemo(
        () => isLoadingBillPayment || isLoadingDebt || isLoadingDcrDate,
        [isLoadingBillPayment, isLoadingDebt, isLoadingDcrDate]
    );

    const hasError = useMemo(
        () => isErrorBillPayment || isErrorDebt || isErrorDcrDate,
        [isErrorBillPayment, isErrorDebt, isErrorDcrDate]
    );

    // Memoize data extraction
    const { paymentStatusId, summaryHeaders, debtHeader } = useMemo(
        () => ({
            paymentStatusId: billPaymentData?.data?.paymentStatusId,
            summaryHeaders: billPaymentData?.data?.summaryHeaders,
            debtHeader: billPaymentData?.data?.debtHeader,
        }),
        [billPaymentData?.data]
    );

    const payerName = useMemo(() => debtHeader?.payerName || "John Doe", [debtHeader?.payerName]);

    // Memoize layout config
    const layoutConfig = useMemo(
        () => ({
            background: APP_CONFIG.images.background,
            header: <HeaderWithPayerName logoSrc={APP_CONFIG.images.header} payerName={payerName} />,
            footer: (
                <Footer callCenterText={APP_CONFIG.footer.callCenter} socialLinks={APP_CONFIG.footer.socialLinks} />
            ),
        }),
        [payerName]
    );

    // Memoize date calculations
    const { isExpired } = useMemo(() => {
        const { payablePeriodTo } = summaryHeaders?.[0] ?? {};
        const local = dayjs(new Date()).local();
        const expire = dayjs(payablePeriodTo);
        return {
            localDate: local,
            expireDate: expire,
            isExpired: local > expire,
        };
    }, [summaryHeaders]);

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
            backgroundImage={layoutConfig.background}
            headerComponent={layoutConfig.header}
            footerComponent={layoutConfig.footer}
            children={
                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: windowDimensions.height }}>
                    <Grid container justifyContent="center" alignItems="center" lg={4}>
                        <Grid item xs={12} sx={{ textAlign: "center", mt: 10.5, mb: 1.5 }}>
                            <Typography variant="h5" fontWeight={"bold"}>
                                สรุปยอดการชำระ
                            </Typography>
                        </Grid>

                        {/* Product List */}
                        <Grid item xs={11} sm={9} md={7} lg={12}>
                            <ProductList
                                billPaymentData={billPaymentData}
                                debtData={debtData}
                                dcrDateData={dcrDateData}
                            />
                        </Grid>

                        {/* Payment Summary */}
                        <Grid item xs={11} sm={9} md={7} lg={12} sx={{ mt: 2, mb: 2 }}>
                            <PaymentSummary billPaymentData={billPaymentData} debtData={debtData} />
                        </Grid>

                        {/* Payment Method Selection Button */}
                        {paymentMethodSelected === 0 && (
                            <Grid item xs={11} sm={9} md={7} lg={12} sx={{ mb: 2 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    endIcon={<ArrowRightIcon />}
                                    sx={{ borderColor: "#0095FF", backgroundColor: "#0095FF", p: 3.5, pt: 1, pb: 1 }}
                                    onClick={handleRedirectPaymentMethod}
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

                        {/* Bill Summary */}
                        <Grid item xs={11} sm={9} md={7} lg={12} sx={{ mb: 2 }}>
                            <BillSummary billPaymentData={billPaymentData} debtData={debtData} />
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    );
};

export default memo(CustomerBillPayment);
