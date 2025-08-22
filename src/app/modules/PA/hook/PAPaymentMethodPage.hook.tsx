import { useParams } from "react-router";
import { useGetInquiry, useGetPABillPayment } from "../paApi";
import { decodeBase64 } from "../../_common/helpersFunction";

const usePAPaymentMethodPageHook = () => {
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

    return {
        billPaymentData,
        isBillPaymentLoading,
        isBillPaymentError,
        inquiryData,
        isInquiryLoading,
        isInquiryError,
    };
};

export default usePAPaymentMethodPageHook;
