import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { useState, useCallback } from "react";
import {
    selectPASlice,
    updateCenpayDialogOpen,
    updateCounterBillDialogOpen,
    updatePaymentMethodSelected,
} from "../paSlice";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { InquiryDto_ResponseServiceResponse } from "../../../api/prmchillpayApi.Client";

interface State {
    open: boolean;
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
}

interface PaymentMethodSelectorHookProps {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
    inquiryData: InquiryDto_ResponseServiceResponse | undefined;
}

const usePaymentMethodSelectorHook = ({ billPaymentData, inquiryData }: PaymentMethodSelectorHookProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { premiumDebt } = billPaymentData?.data || {};
    const { ssChannelCode } = inquiryData?.data || {};
    const { summaryDetailCode } = useParams();
    const { paymentMethodSelected } = useAppSelector(selectPASlice);

    const [paymentMethod, setPaymentMethod] = useState(paymentMethodSelected);
    const [state, setState] = useState<State>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });

    const handleSnackBarClose = () => setState((prev) => ({ ...prev, open: false }));

    const handlePaymentMethodChange = useCallback(
        (method: number) => {
            setPaymentMethod(method);

            const dialogActions: Record<number, () => void> = {
                3: () => dispatch(updateCounterBillDialogOpen(true)),
                4: () => dispatch(updateCenpayDialogOpen(true)),
            };

            if (dialogActions[method]) {
                setState({ vertical: "top", horizontal: "center", open: true });
                dialogActions[method]();
            }
        },
        [dispatch]
    );

    const handlePaymentMethodConfirm = useCallback(
        (method: number) => {
            dispatch(updatePaymentMethodSelected(method));
            navigate(`/pa/${summaryDetailCode}`);
        },
        [dispatch, navigate, summaryDetailCode]
    );

    const handleDisableMethod = (id: number): boolean => {
        if (premiumDebt == null) return false;

        // Amount-based rules
        if (id === 1 && premiumDebt > 2000000) return true;
        if (id === 2 && premiumDebt < 100) return true;
        if ((id === 3 || id === 4) && (premiumDebt < 100 || premiumDebt > 49000)) return true;

        // Channel-based rules
        if (ssChannelCode !== "n/a") {
            if (id === 3 && ssChannelCode !== "BP_COUNTER") return true;
            if (id === 4 && ssChannelCode !== "BP_CENPAY") return true;
        }

        return false;
    };

    return {
        paymentMethod,
        handlePaymentMethodChange,
        handlePaymentMethodConfirm,
        state,
        handleSnackBarClose,
        handleDisableMethod,
        summaryDetailCode,
    };
};

export default usePaymentMethodSelectorHook;
