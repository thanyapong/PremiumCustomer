import { Divider, Grid, Typography } from "@mui/material";
import { GetPaySlipDto_Response } from "../../../../api/prmApi.Client";

type PaySlipBillDetailsProps = {
    payslipData?: GetPaySlipDto_Response[];
};

const PaySlipBillDetails = ({ payslipData }: PaySlipBillDetailsProps) => {
    const headerTextSx = {
        fontSize: { lg: 16, xs: 14 },
        fontWeight: "bold",
    };

    const headerTextDetialsSx = {
        fontSize: { lg: 14, xs: 12 },
        fontWeight: "bold",
    };

    const textDetialsSx = {
        fontSize: { lg: 14, xs: 12 },
    };

    const { b, payerName, ref1, ref2 } = payslipData?.[0]?.refDebHeader ?? {};

    return (
        <>
            <Typography sx={{ color: "#1db1e7", ...headerTextSx, mt: 3 }}>รายละเอียดบิล :</Typography>
            <Divider sx={{ backgroundColor: "#1db1e7" }} />
            <Grid container sx={{ mt: 1 }}>
                <Grid item xs={7} sm={7} md={7} lg={7} sx={{ mt: 1 }}>
                    <Typography sx={headerTextDetialsSx}>หมายเลขบิล :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{b}</Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={5} lg={5} sx={{ mt: 1 }}>
                    <Typography sx={headerTextDetialsSx}>ผู้ชำระเบี้ย :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{payerName}</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 1 }}>
                <Grid item xs={7} sm={7} md={7} lg={7} sx={{ mt: 1 }}>
                    <Typography sx={headerTextDetialsSx}>หมายเลขอ้างอิง (Ref.1) :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{ref1}</Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={5} lg={5} sx={{ mt: 1 }}>
                    <Typography sx={headerTextDetialsSx}>หมายเลขอ้างอิง (Ref.2) :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{ref2}</Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default PaySlipBillDetails;
