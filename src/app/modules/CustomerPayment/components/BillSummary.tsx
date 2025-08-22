import { Button, Grid, Paper, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import {
    GetBillPaymentDto_ResponseServiceResponse,
    GetDebtDto_ResponseListServiceResponse,
} from "../../../api/prmApi.Client";
import { ContentBox } from "../../_common/commonDesign";
import { formatDateString, numberWithCommas } from "../../_common/helpersFunction";
import useBillSummaryHook from "../hooks/BillSummary.hook";

type BillSummaryProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_ResponseListServiceResponse;
};

const BillSummary = ({ billPaymentData, debtData }: BillSummaryProps) => {
    const { handlePayment, isLoading } = useBillSummaryHook({ billPaymentData });
    const { billNo, premiumDebt } = debtData?.data?.[0] ?? {};
    const { displayPayablePeriodTo } = debtData?.data?.[0]?.debtDetails?.[0].summaryHeaders?.[0] ?? {};

    // Consolidated styles
    const baseStyle = { fontSize: { xs: 12, lg: 14 } };
    const labelStyle = { ...baseStyle, textAlign: "left" as const, fontWeight: "bold" };
    const valueStyle = { ...baseStyle, textAlign: "right" as const };

    // Bill info data
    const billInfo = [
        { label: "รหัสแจ้งชำระ", value: billNo },
        {
            label: "กำหนดชำระ",
            value: formatDateString(
                displayPayablePeriodTo?.format?.("YYYY-MM-DD") ?? String(displayPayablePeriodTo ?? ""),
                "DD MMM BBBB"
            ),
        },
    ];

    return (
        <>
            <ContentBox sx={{ boxShadow: 2, borderRadius: 2, backgroundColor: "#BBDEFB" }}>
                {billInfo.map((item, index) => (
                    <Grid container alignItems="center" sx={{ mt: index > 0 ? 1.25 : 0 }} key={index}>
                        <Grid item xs={6}>
                            <Typography sx={labelStyle}>{item.label}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={valueStyle}>{item.value}</Typography>
                        </Grid>
                    </Grid>
                ))}
            </ContentBox>
            <Paper
                elevation={2}
                sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    mt: 2,
                    border: "1px solid #1DB0E6",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    textAlign: "center",
                }}
            >
                <Grid container alignItems="stretch">
                    <Grid
                        item
                        xs={8}
                        sx={{
                            pl: 3.5,
                            pt: 1,
                            pb: 1,
                        }}
                    >
                        <Typography sx={{ fontSize: 16, textAlign: "right", mr: 1 }}>สรุปยอดชำระเงิน</Typography>
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: "bold",
                                textAlign: "right",
                                mr: 1,
                                color: "#1DB0E6",
                            }}
                        >
                            {numberWithCommas(premiumDebt as number)} บาท
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            disabled={isLoading}
                            sx={{
                                height: "100%",
                                justifyContent: "center",
                                textTransform: "none",
                                minWidth: 0,
                                color: "#fff",
                                borderRadius: 2,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                backgroundColor: isLoading ? "#ccc" : "#0095FF",
                                fontSize: 17,
                                "&:hover": {
                                    backgroundColor: isLoading ? "#ccc" : "#007ACC",
                                },
                            }}
                            onClick={handlePayment}
                        >
                            {isLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "ชำระเงิน"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default BillSummary;
