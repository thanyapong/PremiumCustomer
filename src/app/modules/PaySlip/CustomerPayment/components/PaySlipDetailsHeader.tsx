import { Box, Grid, Typography } from "@mui/material";

const correct = "/images/PaySlip/Correct.png";

const PaySlipDetailsHeader = () => {
    const headerTextSx = { fontSize: { lg: 16, xs: 14 }, color: "#43c36e", mt: 1 };

    return (
        <>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: -2.5 }}>
                <Box component="img" src={correct} sx={{ height: 100 }} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography sx={headerTextSx}>ชำระเงินสำเร็จ</Typography>
                <Typography sx={{ ...headerTextSx, color: "#000" }}>ใบรับฝากเงิน</Typography>
            </Grid>
        </>
    );
};

export default PaySlipDetailsHeader;
