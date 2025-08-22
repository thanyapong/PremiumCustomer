import { useEffect } from "react";
import { useAppDispatch } from "../../../../redux";
import { updatePaymentMethodSelected } from "../paSlice";
import { useParams } from "react-router";
import { useGetPABillPayment } from "../paApi";
import { decodeBase64 } from "../../_common/helpersFunction";

const usePABillPaymentPageHook = () => {
    const dispatch = useAppDispatch();
    const { summaryDetailCode } = useParams();
    const {
        data: billPaymentData,
        isLoading: isBillPaymentLoading,
        isError: isBillPaymentError,
    } = useGetPABillPayment({
        summaryDetailCode: decodeBase64(summaryDetailCode as string),
    });

    useEffect(() => {
        dispatch(updatePaymentMethodSelected(1));
    }, []);

    return { billPaymentData, isBillPaymentLoading, isBillPaymentError };
};

export default usePABillPaymentPageHook;
