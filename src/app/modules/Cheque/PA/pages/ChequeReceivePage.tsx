import { useMemo } from "react";
import { Box, Container } from "@mui/material";
import useChequeReceivePageHook from "../hook/ChequeReceivePage.hook";
import { Header, MainLayout } from "../../../_common/commonDesign";
import Loading from "../../../Status/pages/Loading";
import Error from "../../../Status/pages/Error";
import ChequeReceiveButton from "../components/ChequeReceiveButton";

const APP_CONFIG = {
    images: {
        background: "/images/SiamSmile/BPbackground.png",
        header: "/images/SiamSmile/Siamsmilelogo_man_white.png",
    },
} as const;

const ChequeReceivePage = () => {
    const {
        billPaymentData,
        isBillPaymentLoading,
        isBillPaymentError,
        chequeSlipData,
        isChequeSlipLoading,
        isChequeSlipError,
    } = useChequeReceivePageHook();

    // Memoize states
    const { isLoading, hasError } = useMemo(
        () => ({
            isLoading: isBillPaymentLoading || isChequeSlipLoading,
            hasError: isBillPaymentError || isChequeSlipError,
        }),
        [isBillPaymentLoading, isChequeSlipLoading, isBillPaymentError, isChequeSlipError]
    );

    // Early returns for better performance
    if (isLoading) return <Loading />;
    if (hasError) return <Error />;

    return (
        <MainLayout
            backgroundImage={APP_CONFIG.images.background}
            headerComponent={<Header logoSrc={APP_CONFIG.images.header} />}
            footerComponent={[]}
        >
            {/* Simplified layout - ลด Grid ซ้อนซ้อน */}
            <Container maxWidth="md">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                        py: { xs: 4, md: 6 },
                    }}
                >
                    <ChequeReceiveButton billPaymentData={billPaymentData} chequeSlipData={chequeSlipData} />
                </Box>
            </Container>
        </MainLayout>
    );
};

export default ChequeReceivePage;
