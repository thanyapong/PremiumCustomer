import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../redux";
import { selectPASlice } from "../paSlice";
import { swalError, swalWarning } from "../../_common";
import { usePostChillPayPayment } from "../paApi";
import { PaymentDto_ResponseServiceResponse } from "../../../api/prmchillpayApi.Client";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { VITE_CANCEL_URL, VITE_ERROR_URL, VITE_FAIL_URL, VITE_PENDING_URL, VITE_SUCCESS_URL } from "../../../../Const";

interface PaymentButtonProps {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
    handleBillPaymentPDFDownload?: () => void;
}

const usePaymentButtonHook = ({ billPaymentData, handleBillPaymentPDFDownload }: PaymentButtonProps) => {
    const { summaryDetailCode } = useParams();
    const navigate = useNavigate();
    const { paymentMethodSelected } = useAppSelector(selectPASlice);
    const { ref1, payerName, premiumDebt } = billPaymentData?.data || {};

    const createChillPayPayload = (channelCode: string) => ({
        orderRef: ref1,
        customerDetail: payerName,
        amount: premiumDebt as number,
        description: "",
        ssChannelCode: channelCode,
        successURL: VITE_SUCCESS_URL + summaryDetailCode,
        failURL: VITE_FAIL_URL + summaryDetailCode,
        cancelURL: VITE_CANCEL_URL + summaryDetailCode,
        errorURL: VITE_ERROR_URL + summaryDetailCode,
        pendingURL: VITE_PENDING_URL + summaryDetailCode,
        nonce: Date.now().toString(),
    });

    const handlePayment = async () => {
        if (paymentMethodSelected === 0) {
            swalWarning("ท่านยังไม่เลือกวิธีการชำระ", "โปรดเลือกวิธีการชำระเบี้ย");
            return;
        }

        const paymentActions: Record<number, () => void> = {
            1: () => navigate(`/pabp/${summaryDetailCode}`),
            2: () => handleBillPaymentPDFDownload?.(),
            3: () => chillpayPayment(createChillPayPayload("BP_COUNTER")),
            4: () => chillpayPayment(createChillPayPayload("BP_CENPAY")),
        };

        paymentActions[paymentMethodSelected]?.();
    };

    const handlePostChillPayPaymentSuccess = (res: PaymentDto_ResponseServiceResponse | undefined) => {
        const { data, isSuccess } = res ?? {};
        const { paymentUrl, message } = data ?? {};

        if (isSuccess) {
            window.open(paymentUrl, "_self");
        } else if (message === "The payment status is not a pending status.") {
            swalWarning("รายการนี้ได้ทำการชำระเงินเรียบร้อยแล้ว", "").then(() => {
                window.open("about:blank", "_self");
            });
        }
    };

    const handlePostChillPayPaymentError = (error: any) => {
        const errorMessage = error?.response?.message || error;
        swalError(errorMessage, "");
    };

    const { mutate: chillpayPayment, isLoading: isChillpayLoading } = usePostChillPayPayment(
        handlePostChillPayPaymentSuccess,
        handlePostChillPayPaymentError
    );

    return { handlePayment, isChillpayLoading };
};

export default usePaymentButtonHook;
