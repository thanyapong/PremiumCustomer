import { Grid, Typography } from "@mui/material";
import { PaySlipResponseDtoServiceResponse } from "../../../../api/prmApi.Client";
import { formatDateString, numberWithCommas } from "../../../_common/helpersFunction";
import React from "react";

type PaySlipDetailsProps = {
    paySlipData: PaySlipResponseDtoServiceResponse | undefined;
};

type FieldConfig = {
    label: string;
    key: string;
    value?: string;
    isStatic?: boolean;
    hasTopMargin?: boolean;
    isAmount?: boolean;
    formatter?: (value: any) => string;
};

// Configuration object for all fields
const FIELD_CONFIG: FieldConfig[] = [
    { label: "ผลิตภัณฑ์", key: "product", value: "ประกันอุบัติเหตุนักเรียน", isStatic: true },
    { label: "APP ID", key: "applicationCode" },
    { label: "สถานศึกษา", key: "payerName" },
    { label: "ที่อยู่สถานศึกษา", key: "fullAddress" },
    { label: "หมายเลขบิล", key: "bill", hasTopMargin: true },
    { label: "หมายเลขอ้างอิง (Ref.1)", key: "ref1" },
    { label: "หมายเลขอ้างอิง (Ref.2)", key: "ref2" },
    {
        label: "จำนวนเงิน",
        key: "premiumDebt",
        hasTopMargin: true,
        isAmount: true,
        formatter: (value: number) => (value ? `${numberWithCommas(value)} บาท` : "-"),
    },
    {
        label: "วันที่ทำรายการ",
        key: "transactionDatetime",
        formatter: (value: any) => {
            if (!value) return "-";
            return formatDateString(value?.format?.("YYYY-MM-DD") ?? String(value), "DD MMM BBBB HH:mm:ss น.") ?? "-";
        },
    },
];

const PaySlipDetails = ({ paySlipData }: PaySlipDetailsProps) => {
    const data = paySlipData?.data ?? {};

    const headerTextSx = {
        fontSize: { lg: 14, xs: 12 },
        color: "#1db1e7",
    };

    const textDetailsSx = {
        fontSize: { lg: 14, xs: 12 },
    };

    const amountTextSx = {
        ...textDetailsSx,
        fontSize: 18,
        color: "#52c673",
        fontWeight: "bold",
        mt: -0.3,
    };

    const renderField = (field: FieldConfig) => {
        let displayValue: string;

        if (field.isStatic) {
            displayValue = field.value || "-";
        } else if (field.formatter) {
            displayValue = field.formatter((data as any)[field.key]);
        } else {
            displayValue = (data as any)[field.key] ?? "-";
        }

        const itemSx = field.hasTopMargin ? { mt: 3 } : undefined;

        return (
            <React.Fragment key={field.key}>
                <Grid item xs={6} sx={itemSx}>
                    <Typography sx={headerTextSx}>{field.label} :</Typography>
                </Grid>
                <Grid item xs={6} sx={itemSx}>
                    <Typography sx={field.isAmount ? amountTextSx : textDetailsSx}>{displayValue}</Typography>
                </Grid>
            </React.Fragment>
        );
    };

    return (
        <Grid container sx={{ mt: 4 }} spacing={1.5}>
            {FIELD_CONFIG.map(renderField)}
        </Grid>
    );
};

export default PaySlipDetails;
