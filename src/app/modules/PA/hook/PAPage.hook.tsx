import { useNavigate, useParams } from "react-router-dom";
import { useGetInquiry, useGetPABillPayment } from "../paApi";
import { decodeBase64 } from "../../_common/helpersFunction";
import { useWindowDimensions } from "../../_common/hooks/useWindowDimensions";
import { useCallback } from "react";

const usePAPageHook = () => {
    const navigate = useNavigate();
    const windowDimensions = useWindowDimensions(150); // Debounce resize events
    const { summaryDetailCode } = useParams();
    const {
        data: billPaymentData,
        isLoading: isBillPaymentLoading,
        isError: isBillPaymentError,
    } = useGetPABillPayment({
        summaryDetailCode: decodeBase64(summaryDetailCode as string),
    });
    const { ref1 } = billPaymentData?.data ?? {};
    const {
        data: inquiryData,
        isLoading: isInquiryLoading,
        isError: isInquiryError,
    } = useGetInquiry({
        orderRef: ref1,
    });

    const handleRedirectPaymentMethod = useCallback(
        () => navigate(`/papm/${summaryDetailCode}`),
        [navigate, summaryDetailCode]
    );

    return {
        windowDimensions,
        billPaymentData,
        isBillPaymentLoading,
        isBillPaymentError,
        inquiryData,
        isInquiryLoading,
        isInquiryError,
        handleRedirectPaymentMethod,
    };
};

export default usePAPageHook;
