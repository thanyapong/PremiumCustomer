import { Grid, Typography, Box } from "@mui/material";
import { MergedProductItem } from "../customerPaymentApi";
import dayjs from "dayjs";
import { formatDateString, numberWithCommas } from "../../_common/helpersFunction";

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

type ProductDetailsProps = {
    productItem: MergedProductItem;
    index: number;
};

const ProductDetails = ({ productItem, index }: ProductDetailsProps) => {
    const { debtHeader } = productItem ?? {};
    const { debtGroup } = debtHeader ?? {};
    const { debtGroupReferTypeId } = debtGroup ?? {};
    const product = productItem;
    const productGroupNameInThai = getProductGroupNameInThai(product?.productGroupName);
    const periodType = getPeriodType(product);
    const showVehicleDetails = productGroupNameInThai === "ประกันรถยนต์";
    const isDebtGroup11 = debtGroupReferTypeId === 11; // Type assertion for now
    const dcrDate = typeof product.dcrDate?.dcrDate === "string" ? product.dcrDate.dcrDate : undefined;

    const textLabelSx = {
        fontSize: { xs: 12, lg: 14 },
        fontWeight: "bold",
    };

    const textDetailSx = {
        fontSize: { xs: 12, lg: 14 },
    };

    const textDetailProductGroupSx = {
        fontSize: { xs: 12, lg: 14 },
        color: "#47B5F9",
    };

    return (
        <>
            {isDebtGroup11 && (
                <Grid container alignItems="center">
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                        <Typography sx={textLabelSx}>AppID</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography sx={textDetailProductGroupSx}>{product?.applicationCode}</Typography>
                    </Grid>
                </Grid>
            )}
            <Grid container alignItems="center" sx={{ mt: isDebtGroup11 ? 1.25 : 0, textAlign: "left" }}>
                <Grid item xs={1}>
                    <Typography sx={textLabelSx}>{!isDebtGroup11 ? index + 1 : ""}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={textLabelSx}>ผลิตภัณฑ์</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography sx={textDetailProductGroupSx}>{productGroupNameInThai}</Typography>
                </Grid>
            </Grid>
            {[
                { label: "แผนประกัน", value: product.productName || "-" },
                { label: "วันที่เริ่มความคุ้มครอง", value: formatDateString(dcrDate, "DD/MM/BBBB") || "-" },
                { label: "ประเภทการจ่าย", value: periodType },
                { label: "เบี้ย", value: `${numberWithCommas(product.totalAmount as number)} บาท` },
                {
                    label: (
                        <Box>
                            <div>ชื่อผู้เอาประกัน/</div>
                            <div>รายละเอียด</div>
                        </Box>
                    ),
                    value: product.custName,
                },
                ...(showVehicleDetails ? [{ label: "เลขทะเบียน", value: product.detail1 || "" }] : []),
            ].map((item, idx) => (
                <Grid
                    container
                    alignItems="center"
                    sx={{
                        mt: 1.25,
                        textAlign: "left",
                        ...(showVehicleDetails && item.label === "วันที่เริ่มความคุ้มครอง"
                            ? { borderRadius: "5px", backgroundColor: "#E8E8E8", height: 40 }
                            : item.label === "วันที่เริ่มความคุ้มครอง"
                            ? { display: "none" }
                            : {}),
                    }}
                    key={typeof item.label === "string" ? item.label : `label-${idx}`}
                >
                    <Grid item xs={1} />
                    <Grid item xs={6}>
                        <Typography sx={textLabelSx}>{item.label}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography
                            sx={{
                                ...textDetailSx,
                                ...(showVehicleDetails && item.label === "วันที่เริ่มความคุ้มครอง"
                                    ? { color: "#1db1e7" }
                                    : {}),
                            }}
                        >
                            {item.value}
                        </Typography>
                    </Grid>
                </Grid>
            ))}
            {isDebtGroup11 &&
                [
                    {
                        label: "วันที่เริ่มความคุ้มครอง",
                        value: formatDateString((product as any).periodFrom, "DD MMMM BBBB"),
                    },
                    {
                        label: "วันที่สิ้นสุดความคุ้มครอง",
                        value: (product as any).periodFrom
                            ? dayjs((product as any).periodFrom)
                                  .add(1, "year")
                                  .format("DD MMMM BBBB")
                            : "-",
                    },
                ].map(({ label, value }) => (
                    <Grid container alignItems="center" sx={{ mt: 1.25 }} key={label}>
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                            <Typography sx={textLabelSx}>{label}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography sx={textDetailSx}>{value || "-"}</Typography>
                        </Grid>
                    </Grid>
                ))}
        </>
    );
};

export default ProductDetails;
