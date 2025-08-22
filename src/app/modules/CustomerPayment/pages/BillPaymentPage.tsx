import { Grid, IconButton, Typography } from "@mui/material";
import { Footer, HeaderWithPayerName, MainLayout } from "../../_common/commonDesign";
import Error from "../../Status/pages/Error";
import Loading from "../../Status/pages/Loading";
import useBillPaymentPageHook from "../hooks/BillPaymentPage.hook";
import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import BillPaymentDetails from "../components/BillPaymentDetails";
import { useMemo } from "react";
import dayjs from "dayjs";
import Thankyou from "../../Status/pages/Thankyou";
import BillCancelled from "../../Status/pages/BillCancelled";
import Timeout from "../../Status/pages/Timeout";

// Constants
const IMAGES = {
    background: "/images/SiamSmile/BPbackground.png",
    header: "/images/SiamSmile/Siamsmilelogo_man_white.png",
    facebook: "/images/SocialMedia/facebook.png",
    youtube: "/images/SocialMedia/youtube.png",
    line: "/images/SocialMedia/line.png",
    website: "/images/SocialMedia/siamsmile.png",
};

const LINKS = {
    callCenter: "Call Center โทร 1434",
    facebook: "https://www.facebook.com/siamsmilebroker/",
    youtube: "https://www.youtube.com/channel/UC-x4bdgWZCeYqJO5RBFkg7w",
    line: "https://line.me/R/ti/p/%40siamsmile",
    website: "https://www.siamsmilebroker.co.th/",
};

const BillPaymentPage = () => {
    const navigate = useNavigate();
    const {
        summaryDetailCode,
        billPaymentData,
        isLoadingBillPayment,
        isErrorBillPayment,
        debtData,
        isLoadingDebt,
        isErrorDebt,
    } = useBillPaymentPageHook();

    // Memoize loading and error states
    const isLoading = useMemo(() => isLoadingBillPayment || isLoadingDebt, [isLoadingBillPayment, isLoadingDebt]);

    const hasError = useMemo(() => isErrorBillPayment || isErrorDebt, [isErrorBillPayment, isErrorDebt]);

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

    // Social links array
    const socialLinks = [
        { href: LINKS.facebook, src: IMAGES.facebook, alt: "Facebook" },
        { href: LINKS.youtube, src: IMAGES.youtube, alt: "YouTube" },
        { href: LINKS.line, src: IMAGES.line, alt: "LINE", width: 32.5, height: 32.5 },
        { href: LINKS.website, src: IMAGES.website, alt: "Website" },
    ];

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
            backgroundImage={IMAGES.background}
            headerComponent={<HeaderWithPayerName logoSrc={IMAGES.header} payerName={payerName} />}
            footerComponent={<Footer callCenterText={LINKS.callCenter} socialLinks={socialLinks} />}
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
                            px: { xs: 0, sm: 2 },
                        }}
                    >
                        <Grid item xs={12} sx={{ mt: { xs: 1, sm: 11.5 }, display: "flex", alignItems: "center" }}>
                            <Grid item xs={1}>
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
                            <Grid item xs={11}>
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: { xs: "1.2rem", sm: "1.5rem" },
                                        textAlign: "center",
                                    }}
                                >
                                    ใบแจ้งชำระเบี้ย (Bill Payment)
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: "0.95rem", mt: 3 }}>
                                ทำการชำระผ่านโมบายแบงค์กิ้งได้ทุกธนาคาร ชำระภายในวันและเวลาที่กำหนด
                                มิเช่นนั้นรายการชำระของคุณจะถูกยกเลิก
                            </Typography>
                        </Grid>
                        <Grid item xs={11} sm={8} md={8} lg={9} sx={{ mt: 2.5, mb: 2 }}>
                            <BillPaymentDetails billPaymentData={billPaymentData} debtData={debtData} />
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    );
};

export default BillPaymentPage;
