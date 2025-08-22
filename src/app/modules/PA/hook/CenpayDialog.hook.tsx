import { useAppDispatch } from "../../../../redux";
import { updateCenpayDialogOpen } from "../paSlice";

const useCenpayDialogHook = () => {
    const dispatch = useAppDispatch();

    const handleDialogClose = () => dispatch(updateCenpayDialogOpen(false));

    return {
        handleDialogClose,
    };
};

export default useCenpayDialogHook;
