import { Grid } from "@mui/material";
import { Header, MainLayout } from "../../_common/commonDesign";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import usePAPaymentMethodPageHook from "../hook/PAPaymentMethodPage.hook";
import Loading from "../../Status/pages/Loading";
import Error from "../../Status/pages/Error";
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

const PAPaymentMethodPage = () => {
    const { billPaymentData, isBillPaymentLoading, isBillPaymentError, inquiryData, isInquiryLoading, isInquiryError } =
        usePAPaymentMethodPageHook();
    const { payablePeriodTo, paymentStatusId } = billPaymentData?.data ?? {};

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

    if (isBillPaymentLoading || isInquiryLoading) return <Loading />;
    if (isBillPaymentError || isInquiryError) return <Error />;

    // Check payment status and render appropriate component
    if (billPaymentData?.data) {
        if (paymentStatusId == 3) return <Thankyou />;
        else if (paymentStatusId === 5) return <BillCancelled />;
        else if (isExpired || paymentStatusId === 6) return <Timeout />;
    }

    return (
        <MainLayout
            headerComponent={<Header textHeader="เลือกวิธีชำระเบี้ยประกัน" />}
            backgroundImage={APP_CONFIG.images.background}
            footerComponent={null}
            footerCallCenter=""
            footerSocialLinks={[]}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    flex: 1,
                    pt: { xs: 1, sm: 1 },
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
                    <PaymentMethodSelector billPaymentData={billPaymentData} inquiryData={inquiryData} />
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default PAPaymentMethodPage;
