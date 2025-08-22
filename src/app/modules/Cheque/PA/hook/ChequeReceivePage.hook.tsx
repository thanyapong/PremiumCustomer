import { useParams } from "react-router-dom";
import { decodeBase64 } from "../../../_common/helpersFunction";
import { useGetChequeSlip, useGetPABillPayment } from "../chequeReceiveApi";

const useChequeReceivePageHook = () => {
    const { summaryDetailCode } = useParams();
    const {
        data: billPaymentData,
        isLoading: isBillPaymentLoading,
        isError: isBillPaymentError,
    } = useGetPABillPayment({
        summaryDetailCode: decodeBase64(summaryDetailCode as string),
    });
    const { summaryDetailId } = billPaymentData?.data ?? {};

    const {
        data: chequeSlipData,
        isLoading: isChequeSlipLoading,
        isError: isChequeSlipError,
    } = useGetChequeSlip(summaryDetailId);

    return {
        billPaymentData,
        isBillPaymentLoading,
        isBillPaymentError,
        chequeSlipData,
        isChequeSlipLoading,
        isChequeSlipError,
    };
};

export default useChequeReceivePageHook;
