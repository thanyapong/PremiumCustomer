import { ContentBox } from "../../_common/commonDesign";
import { Grid, Typography } from "@mui/material";
import {
    GetBillPaymentDto_ResponseServiceResponse,
    GetDebtDto_ResponseListServiceResponse,
} from "../../../api/prmApi.Client";
import { numberWithCommas } from "../../_common/helpersFunction";
import { memo } from "react";

type PaymentSummaryProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_ResponseListServiceResponse;
};

const PaymentSummary = ({ billPaymentData, debtData }: PaymentSummaryProps) => {
    const { debtDetail } = billPaymentData?.data ?? {};
    const { premiumDebt } = debtData?.data?.[0] ?? {};

    // Consolidated styles
    const baseStyle = { fontSize: { xs: 12, lg: 14 } };
    const leftStyle = { ...baseStyle, textAlign: "left" as const };
    const rightStyle = { ...baseStyle, textAlign: "right" as const };

    // Summary data
    const summaryData = [
        {
            label: `รวมจำนวนทั้งสิ้น ( ${debtDetail?.length} รายการ )`,
            value: `${numberWithCommas(premiumDebt as number)} บาท`,
            color: "inherit",
        },
        {
            label: "ส่วนลด ( เงินสด )",
            value: "-",
            color: "#fff",
        },
        {
            label: "ส่วนลด ( แต้ม )",
            value: "-",
            color: "#fff",
        },
        {
            label: "สรุปยอดชำระเงิน",
            value: `${numberWithCommas(premiumDebt as number)} บาท`,
            color: "inherit",
            fontWeight: "bold",
        },
    ];

    return (
        <ContentBox sx={{ boxShadow: 2, borderRadius: 2, borderColor: "#1DB0E6", backgroundColor: "#BBDEFB" }}>
            {summaryData.map((item, index) => (
                <Grid container alignItems="center" sx={{ mt: index > 0 ? 1.25 : 0, color: item.color }} key={index}>
                    <Grid item xs={6}>
                        <Typography sx={{ ...leftStyle, fontWeight: item.fontWeight }}>{item.label}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ ...rightStyle, fontWeight: item.fontWeight }}>{item.value}</Typography>
                    </Grid>
                </Grid>
            ))}
        </ContentBox>
    );
};

export default memo(PaymentSummary);
