import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { selectCustomerPaymentSlice, updatePaymentMethodSelected } from "../customerPaymentSlice";

const usePaymentMethodSelectorHook = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { summaryDetailCode } = useParams();
    const { paymentMethodSelected } = useAppSelector(selectCustomerPaymentSlice);
    const [paymentMethod, setPaymentMethod] = useState(paymentMethodSelected);

    const handlePaymentMethodChange = (method: number) => {
        setPaymentMethod(method);
    };

    const handlePaymentMethodConfirm = (method: number) => {
        dispatch(updatePaymentMethodSelected(method));
        navigate(`/cp/${summaryDetailCode}`);
    };

    return { paymentMethod, handlePaymentMethodChange, handlePaymentMethodConfirm, summaryDetailCode };
};

export default usePaymentMethodSelectorHook;
