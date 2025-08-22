import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux";
import { updatePaymentMethodSelected } from "../customerPaymentSlice";
import { useEffect } from "react";
import { decodeBase64 } from "../../_common/helpersFunction";
import { useGetBillPaymentBySummaryDetailCode, useGetDebt } from "../customerPaymentApi";

const useBillPaymentPageHook = () => {
    const dispatch = useAppDispatch();
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

    useEffect(() => {
        dispatch(updatePaymentMethodSelected(1));
    }, []);

    return {
        summaryDetailCode,
        billPaymentData,
        isLoadingBillPayment,
        isErrorBillPayment,
        debtData,
        isLoadingDebt,
        isErrorDebt,
    };
};

export default useBillPaymentPageHook;
