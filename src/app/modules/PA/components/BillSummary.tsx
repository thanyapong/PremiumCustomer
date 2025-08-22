import { Grid, Typography } from "@mui/material";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { ContentBox } from "../../_common/commonDesign";
import { formatDateString } from "../../_common/helpersFunction";

type BillSummaryProps = {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
};

const BillSummary = ({ billPaymentData }: BillSummaryProps) => {
    const { bill, payablePeriodTo } = billPaymentData?.data ?? {};
    const formattedDate = formatDateString(payablePeriodTo as unknown as string, "DD/MM/BBBB HH:mm น.");

    const textSx = {
        label: { fontSize: { xs: 12, lg: 14 }, color: "#757575", textAlign: "left" as const },
        value: { fontSize: { xs: 12, lg: 14 }, textAlign: "right" as const },
    };

    const billSummaryData = [
        { label: "หมายเลขบิล", value: bill },
        { label: "วันที่สิ้นสุดการชำระเบี้ย", value: formattedDate, spacing: 2 },
    ];

    return (
        <ContentBox sx={{ boxShadow: 2 }}>
            {billSummaryData.map((item) => (
                <Grid container alignItems="center" key={item.label} sx={{ mt: item.spacing || 0 }}>
                    <Grid item xs={6}>
                        <Typography sx={textSx.label}>{item.label}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={textSx.value}>{item.value}</Typography>
                    </Grid>
                </Grid>
            ))}
        </ContentBox>
    );
};

export default BillSummary;
