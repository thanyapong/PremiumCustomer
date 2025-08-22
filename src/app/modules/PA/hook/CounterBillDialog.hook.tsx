import { useAppDispatch } from "../../../../redux";
import { updateCounterBillDialogOpen } from "../paSlice";

const useCounterBillDialogHook = () => {
    const dispatch = useAppDispatch();

    const handleDialogClose = () => dispatch(updateCounterBillDialogOpen(false));

    return {
        handleDialogClose,
    };
};

export default useCounterBillDialogHook;
