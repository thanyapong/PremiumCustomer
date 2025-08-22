import { Grid, IconButton, Typography } from "@mui/material";
import { Footer, HeaderWithPayerName, MainLayout } from "../../_common/commonDesign";
import useCustomerPaymentPageHook from "../hooks/CustomerPaymentPage.hook";
import usePaymentMethodPageHook from "../hooks/PaymentMethodPage.hook";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import Loading from "../../Status/pages/Loading";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import dayjs from "dayjs";
import Thankyou from "../../Status/pages/Thankyou";
import BillCancelled from "../../Status/pages/BillCancelled";
import Timeout from "../../Status/pages/Timeout";
import Error from "../../Status/pages/Error";

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
    pageContent: {
        title: "เลือกวิธีการชำระเบี้ยประกัน",
        subtitle: "ช่องทางการชำระหน้างาน",
    },
};

type PaymentMethodProps = {};

const PaymentMethod = ({}: PaymentMethodProps) => {
    const navigate = useNavigate();
    const { summaryDetailCode } = usePaymentMethodPageHook({});
    const {
        billPaymentData,
        isLoadingBillPayment,
        isLoadingDebt,
        isLoadingDcrDate,
        isErrorBillPayment,
        isErrorDebt,
        isErrorDcrDate,
    } = useCustomerPaymentPageHook();

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

    const layoutConfig = {
        background: APP_CONFIG.images.background,
        header: <HeaderWithPayerName logoSrc={APP_CONFIG.images.header} payerName={payerName} />,
        footer: <Footer callCenterText={APP_CONFIG.footer.callCenter} socialLinks={APP_CONFIG.footer.socialLinks} />,
    };

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
                <Grid
                    container
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        flex: 1,
                        pt: { xs: 10, sm: 1 },
                        px: { xs: 2, sm: 0 },
                        mb: { xs: 2 },
                    }}
                >
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            width: { xs: "100%", sm: "600px", md: "600px", lg: "600px" },
                            maxWidth: { xs: "100%", sm: "600px" },
                            px: { xs: 0, sm: 2, md: 5, lg: 6 },
                        }}
                    >
                        {/* Header Section */}
                        <Grid item xs={12} sx={{ mt: { xs: 1, sm: 11.5 } }}>
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <IconButton
                                        sx={{
                                            backgroundColor: "#1db1e7",
                                            "&:hover": { backgroundColor: "#1a91c7" },
                                            width: { xs: 40, sm: 48 },
                                            height: { xs: 40, sm: 48 },
                                            boxShadow: 5,
                                        }}
                                        onClick={() => navigate(`/cp/${summaryDetailCode}`)}
                                    >
                                        <ArrowLeftIcon sx={{ color: "#fff" }} fontSize="large" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography
                                        variant="h5"
                                        fontWeight={"bold"}
                                        sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                                    >
                                        {APP_CONFIG.pageContent.title}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                                        {APP_CONFIG.pageContent.subtitle}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Payment Method Selector */}
                        <Grid item xs={12}>
                            <PaymentMethodSelector />
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    );
};

export default PaymentMethod;
