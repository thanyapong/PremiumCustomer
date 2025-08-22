import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { ContentBox } from "../../_common/commonDesign";
import { Grid, Typography } from "@mui/material";
import { numberWithCommas } from "../../_common/helpersFunction";
import { memo, useMemo } from "react";

type PaymentSummaryProps = {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
};

const PaymentSummary = memo(({ billPaymentData }: PaymentSummaryProps) => {
    const { premiumDebt } = billPaymentData?.data ?? {};
    const formattedAmount = useMemo(() => `${numberWithCommas(premiumDebt as number)} บาท`, [premiumDebt]);

    const textSx = useMemo(
        () => ({
            label: { fontSize: { xs: 12, lg: 14 }, color: "#757575", textAlign: "left" as const },
            value: { fontSize: { xs: 12, lg: 14 }, textAlign: "right" as const },
        }),
        []
    );

    const summaryData = useMemo(
        () => [
            { label: "รวมจำนวนเงินทั้งสิ้น (1 รายการ)", value: formattedAmount },
            { label: "สรุปยอดการชำระ", value: formattedAmount, spacing: 2 },
        ],
        [formattedAmount]
    );

    return (
        <ContentBox sx={{ boxShadow: 2 }}>
            {summaryData.map((item) => (
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
});

PaymentSummary.displayName = "PaymentSummary";

export default PaymentSummary;
