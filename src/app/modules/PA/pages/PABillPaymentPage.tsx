import { Grid } from "@mui/material";
import { Header, MainLayout } from "../../_common/commonDesign";
import usePABillPaymentPageHook from "../hook/PABillPaymentPage.hook";
import { useMemo } from "react";
import Loading from "../../Status/pages/Loading";
import Error from "../../Status/pages/Error";
import BillPaymentDetails from "../components/BillPaymentDetails";
import dayjs from "dayjs";
import Thankyou from "../../Status/pages/Thankyou";
import BillCancelled from "../../Status/pages/BillCancelled";
import Timeout from "../../Status/pages/Timeout";

const APP_CONFIG = {
    images: {
        background: "/images/SiamSmile/BPbackground.png",
    },
};

const PABillPaymentPage = () => {
    const { billPaymentData, isBillPaymentLoading, isBillPaymentError } = usePABillPaymentPageHook();
    const { payablePeriodTo, paymentStatusId } = billPaymentData?.data ?? {};

    // Memoize loading and error states
    const isLoading = useMemo(() => isBillPaymentLoading, [isBillPaymentLoading]);

    const hasError = useMemo(() => isBillPaymentError, [isBillPaymentError]);

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
            headerComponent={<Header />}
            backgroundImage={APP_CONFIG.images.background}
            footerComponent={null} // Assuming no footer for this page
            footerCallCenter=""
            footerSocialLinks={[]}
            children={
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
                            width: { xs: "100%", sm: "450px", md: "500px", lg: "550px" },
                            maxWidth: { xs: "100%", sm: "600px" },
                            px: { xs: 0, sm: 2, md: 5, lg: 6 },
                        }}
                    >
                        <BillPaymentDetails billPaymentData={billPaymentData} />
                    </Grid>
                </Grid>
            }
        />
    );
};

export default PABillPaymentPage;
