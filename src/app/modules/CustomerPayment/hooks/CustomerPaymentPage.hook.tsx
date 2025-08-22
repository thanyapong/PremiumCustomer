import { useNavigate, useParams } from "react-router-dom";
import { useGetBillPaymentBySummaryDetailCode, useGetDcrDateByOrderId, useGetDebt } from "../customerPaymentApi";
import { decodeBase64 } from "../../_common/helpersFunction";
import { useCallback } from "react";
import { useWindowDimensions } from "../../_common/hooks/useWindowDimensions";

const useCustomerPaymentPageHook = () => {
    const navigate = useNavigate();
    const windowDimensions = useWindowDimensions(150); // Debounce resize events

    const { summaryDetailCode } = useParams();
    const {
        data: billPaymentData,
        isLoading: isLoadingBillPayment,
        isError: isErrorBillPayment,
    } = useGetBillPaymentBySummaryDetailCode(decodeBase64(summaryDetailCode || ""));
    const { debtHeader } = billPaymentData?.data ?? {};
    const { debtHeaderId, billNo } = debtHeader ?? {};
    const {
        data: debtData,
        isLoading: isLoadingDebt,
        isError: isErrorDebt,
    } = useGetDebt({ debtHeaderId: debtHeaderId ?? "", billNo });
    const {
        data: dcrDateData,
        isLoading: isLoadingDcrDate,
        isError: isErrorDcrDate,
    } = useGetDcrDateByOrderId(debtHeaderId ?? "");

    const handleRedirectPaymentMethod = useCallback(
        () => navigate(`/pm/${summaryDetailCode}`),
        [navigate, summaryDetailCode]
    );

    return {
        billPaymentData,
        isLoadingBillPayment,
        debtData,
        isLoadingDebt,
        dcrDateData,
        isLoadingDcrDate,
        isErrorBillPayment,
        isErrorDebt,
        isErrorDcrDate,
        windowDimensions,
        handleRedirectPaymentMethod,
    };
};

export default useCustomerPaymentPageHook;
