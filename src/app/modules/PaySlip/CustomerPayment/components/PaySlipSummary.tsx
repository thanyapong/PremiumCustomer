import { GetPaySlipDto_Response } from "../../../../api/prmApi.Client";
import { Grid, Typography } from "@mui/material";
import { formatDateString, numberWithCommas } from "../../../_common/helpersFunction";

type PaySlipSummaryProps = {
    payslipData?: GetPaySlipDto_Response[];
};

const PaySlipSummary = ({ payslipData }: PaySlipSummaryProps) => {
    const { totalAmount, refDebHeader } = payslipData?.[0] ?? {};
    const { transactionDatetime } = refDebHeader ?? {};

    const headerTextDetialsSx = {
        fontSize: { lg: 16, xs: 14 },
        fontWeight: "bold",
        color: "#1db1e7",
    };

    const textDetialsSx = {
        fontSize: { lg: 14, xs: 12 },
    };

    return (
        <>
            <Grid container alignItems="center" sx={{ mt: 2 }}>
                <Grid item xs={7}>
                    <Typography sx={headerTextDetialsSx}>จำนวนเงิน :</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography sx={{ ...textDetialsSx, fontWeight: "bold", fontSize: 18, color: "#52c673" }}>
                        {numberWithCommas(totalAmount as number)} บาท
                    </Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ mt: 2 }}>
                <Grid item xs={7}>
                    <Typography sx={headerTextDetialsSx}>วันที่ทำรายการสำเร็จ :</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography sx={textDetialsSx}>
                        {formatDateString(
                            transactionDatetime?.format?.("YYYY-MM-DD") ?? String(transactionDatetime ?? ""),
                            "DD MMM BBBB , HH:mm น."
                        )}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default PaySlipSummary;
