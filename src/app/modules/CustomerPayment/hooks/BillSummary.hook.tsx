import { useNavigate, useParams } from "react-router-dom";
import { selectCustomerPaymentSlice } from "../customerPaymentSlice";
import { useAppSelector } from "../../../../redux";
import { GetBillPaymentDto_ResponseServiceResponse } from "../../../api/prmApi.Client";
import { VITE_AGREEMENT_URL, VITE_CANCEL_URL, VITE_FAIL_URL, VITE_SUCCESS_URL } from "../../../../Const";
import { swalWarning } from "../../_common";
import { useState } from "react";

type BillSummaryHookProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
};

const useBillSummaryHook = ({ billPaymentData }: BillSummaryHookProps) => {
    const { summaryDetailCode } = useParams();
    const navigate = useNavigate();
    const { ref1, premiumDebt } = billPaymentData?.data?.debtHeader ?? {};
    const { paymentMethodSelected } = useAppSelector(selectCustomerPaymentSlice);
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        if (paymentMethodSelected === 0) {
            swalWarning("ท่านยังไม่เลือกวิธีการชำระ", "โปรดเลือกวิธีการชำระเบี้ย");
            return;
        }

        if (paymentMethodSelected === 1) {
            navigate(`/bp/${summaryDetailCode}`);
        } else {
            try {
                setIsLoading(true);
                const paymentData = {
                    orderRef: ref1,
                    amount: premiumDebt,
                    successUrlRedirect: VITE_SUCCESS_URL + summaryDetailCode,
                    failUrlRedirect: VITE_FAIL_URL + summaryDetailCode,
                    cancelUrlRedirect: VITE_CANCEL_URL + summaryDetailCode,
                };

                // Create form element and submit
                const form = document.createElement("form");
                form.method = "POST";
                form.action = VITE_AGREEMENT_URL;

                // Add form fields
                Object.entries(paymentData).forEach(([key, value]) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = String(value);
                    form.appendChild(input);
                });

                // Submit form
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
            } catch (error) {
                console.error("Payment error:", error);
                setIsLoading(false);
            }
        }
    };

    return { handlePayment, isLoading };
};

export default useBillSummaryHook;
