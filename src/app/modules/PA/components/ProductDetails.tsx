import { Grid, Typography } from "@mui/material";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { ContentBox } from "../../_common/commonDesign";
import { memo, useMemo } from "react";

type ProductDetailsProps = {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
};

const ProductDetails = memo(({ billPaymentData }: ProductDetailsProps) => {
    const { applicationCode, payerName, productName, contactName } = billPaymentData?.data ?? {};

    const textSx = useMemo(
        () => ({
            label: { fontSize: { xs: 12, lg: 14 }, textAlign: "left" as const, color: "#757575" },
            value: { fontSize: { xs: 12, lg: 14 }, textAlign: "right" as const },
        }),
        []
    );

    const productDetailsData = useMemo(
        () => [
            { label: "ผลิตภัณฑ์", value: "ประกันอุบัติเหตุนักเรียน" },
            { label: "AppID", value: applicationCode ?? "-" },
            { label: "ชื่อสถานศึกษา", value: payerName ?? "-" },
            { label: "แผน", value: productName ?? "-" },
            { label: "ครูผู้ประสานงาน", value: contactName ?? "-" },
        ],
        [applicationCode, payerName, productName, contactName]
    );

    return (
        <ContentBox sx={{ boxShadow: 2 }}>
            {productDetailsData.map((item, index) => (
                <Grid container alignItems="center" key={item.label} sx={{ mt: index > 0 ? 2 : 0 }}>
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

ProductDetails.displayName = "ProductDetails";

export default ProductDetails;
