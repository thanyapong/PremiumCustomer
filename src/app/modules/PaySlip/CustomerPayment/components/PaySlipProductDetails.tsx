import { Divider, Grid, Typography } from "@mui/material";
import { DebtDetail_GetPaySlip } from "../../../../api/prmApi.Client";
import { numberWithCommas } from "../../../_common/helpersFunction";

const getProductGroupNameInThai = (name?: string): string => {
    const lowerName = name?.toLowerCase();
    if (!lowerName) return "-";

    const mapping = [
        ["ph", "ประกันสุขภาพ"],
        ["p30", "ประกันอุบัติเหตุ PA30"],
        ["pa30", "ประกันอุบัติเหตุ PA30"],
        ["pl", "ประกันชีวิต"],
        ["house", "ประกันบ้าน"],
        ["smilepa", "เบ็ดเตล็ด - SmilePA"],
        ["ta", "เบ็ดเตล็ด - TA"],
        ["golf", "เบ็ดเตล็ด - Golf"],
        ["home", "เบ็ดเตล็ด - Home"],
        ["criticalillness", "ประกันโรคร้ายแรง"],
    ];

    for (const [key, value] of mapping) {
        if (lowerName.includes(key)) return value;
    }

    return name && (name.includes("ภาคบังคับ CMI") || name.includes("ภาคสมัครใจ VMI")) ? "ประกันรถยนต์" : "-";
};

const getPeriodType = (product: any): string => {
    const lowerName = product.productGroupName?.toLowerCase();
    return ["smilepa", "ta", "golf", "home"].some((type) => lowerName?.includes(type))
        ? "จ่ายครั้งเดียว"
        : product.periodType?.periodTypeName || "-";
};

type PaySlipProductDetailsProps = {
    refDebtDetail?: DebtDetail_GetPaySlip;
    productItemNo?: number;
};

const PaySlipProductDetails = ({ refDebtDetail, productItemNo }: PaySlipProductDetailsProps) => {
    if (!refDebtDetail) {
        return null;
    }
    const { productGroupName, productName, totalAmount, detail1, custName } = refDebtDetail ?? {};

    const productGroupNameInThai = getProductGroupNameInThai(productGroupName);
    const periodTypeInThai = getPeriodType(refDebtDetail);
    const showVehicleDetails = productGroupNameInThai === "ประกันรถยนต์";

    const headerTextDetialsSx = {
        fontSize: { lg: 14, xs: 12 },
        fontWeight: "bold",
    };

    const textDetialsSx = {
        fontSize: { lg: 14, xs: 12 },
    };

    return (
        <>
            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={1}>
                    <Typography sx={{ ...textDetialsSx }}>{(productItemNo as number) + 1 + "."}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={headerTextDetialsSx}>ผลิตภัณฑ์ :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{productGroupNameInThai}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography sx={headerTextDetialsSx}>แผน :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{productName}</Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={1} />
                <Grid item xs={6}>
                    <Typography sx={headerTextDetialsSx}>ประเภทการจ่าย :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{periodTypeInThai}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography sx={headerTextDetialsSx}>เบี้ยประกัน :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>
                        {numberWithCommas(totalAmount as number)} บาท
                    </Typography>
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={1} />
                <Grid item xs={6}>
                    <Typography sx={headerTextDetialsSx}>ชื่อผู้เอาประกัน :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{custName}</Typography>
                </Grid>
                <Grid item xs={5} sx={{ display: showVehicleDetails ? "block" : "none" }}>
                    <Typography sx={headerTextDetialsSx}>เลขทะเบียน :</Typography>
                    <Typography sx={{ mt: 1, ...textDetialsSx }}>{detail1}</Typography>
                </Grid>
            </Grid>
            <Divider sx={{ mt: 2, backgroundColor: "#1db1e7" }} />
        </>
    );
};

export default PaySlipProductDetails;
