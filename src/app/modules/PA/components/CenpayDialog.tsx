import { useSelector } from "react-redux";
import useCenpayDialogHook from "../hook/CenpayDialog.hook";
import { selectPASlice } from "../paSlice";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
    Buttons,
    DialogActionsWrapper,
    DialogContentWrapper,
    DialogTitleWrapper,
    DialogWrapper,
} from "../../_common/commonDesign";
import CenpayDetails from "./CenpayDetails";

const CenpayDialog = () => {
    const theme = useTheme();
    const { handleDialogClose } = useCenpayDialogHook();
    const { cenpayDialogOpen } = useSelector(selectPASlice);
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <DialogWrapper open={cenpayDialogOpen} fullScreen={fullScreen} fullWidth maxWidth={"md"}>
            <DialogTitleWrapper sx={{ textAlign: "center" }}>
                <Typography variant="h6">เงื่อนไขผู้ให้บริการชำระเงิน</Typography>
            </DialogTitleWrapper>
            <DialogContentWrapper dividers>
                <CenpayDetails />
            </DialogContentWrapper>
            <DialogActionsWrapper>
                <Grid container justifyContent="center" alignItems="center" item sx={{ p: 1 }}>
                    <Grid item xs={6} sm={5} md={4} lg={3}>
                        <Buttons fullWidth size="large" sx={{ backgroundColor: "#1db0e6" }} onClick={handleDialogClose}>
                            ปิด
                        </Buttons>
                    </Grid>
                </Grid>
            </DialogActionsWrapper>
        </DialogWrapper>
    );
};

export default CenpayDialog;
