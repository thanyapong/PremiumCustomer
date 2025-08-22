import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    styled,
} from "@mui/material";

const IMAGES = {
    bigC: "/images/PA/CounterBill/bigC.png",
    cj: "/images/PA/CounterBill/cj.png",
    maxvalu: "/images/PA/CounterBill/maxvalu.png",
    jiffy: "/images/PA/CounterBill/jiffy.png",
    jaymart: "/images/PA/CounterBill/jaymart.png",
    srisawad: "/images/PA/CounterBill/srisawad.png",
    taweeyon: "/images/PA/CounterBill/taweeyon.png",
    kasikorn: "/images/PA/CounterBill/kasikorn.png",
    kplus: "/images/PA/CounterBill/kplus.png",
    kSME: "/images/PA/CounterBill/kSME.png",
    kBiz: "/images/PA/CounterBill/kBiz.png",
} as const;

const StyledTable = styled(Table)({
    minWidth: 800,
    "& .MuiTableCell-root": { borderLeft: "1px solid rgba(224, 224, 224, 1)" },
});

const FlexCell = styled(TableCell)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    [theme.breakpoints.down("sm")]: { fontSize: 12 },
}));

const Img = styled("img")(({ theme }) => ({
    width: 75,
    marginLeft: -15,
    marginTop: 10,
    [theme.breakpoints.down("sm")]: { width: 60, height: 60 },
}));

const SmallImg = styled("img")(({ theme }) => ({
    width: 62,
    marginRight: 10,
    marginTop: 5,
    marginLeft: -8,
    [theme.breakpoints.down("sm")]: { width: 47, height: 47, marginRight: 8 },
}));
const KPlusImg = styled("img")(({ theme }) => ({
    width: 75,
    marginRight: 10,
    marginTop: 5,
    marginLeft: -14,
    [theme.breakpoints.down("sm")]: { width: 61, marginRight: 8 },
}));

const Text = styled(Typography)(({ theme }) => ({
    fontSize: 13,
    [theme.breakpoints.down("sm")]: { fontSize: 11 },
}));

const BahtPerTxn = styled("span")({ whiteSpace: "nowrap" });

const paymentMethods = [
    {
        img: IMAGES.bigC,
        name: "Big C (บิ๊กซี)",
        limit: "40,000.00",
        hours: "24 ชม. (mini big C)\n8.00 - 23.00 น. (Supercenter)",
        note: "-",
    },
    { img: IMAGES.cj, name: "CJ Express (ซี.เจ.เอ็กซ์เพรส)", limit: "30,000.00", hours: "6.00 - 23.00 น.", note: "-" },
    { img: IMAGES.maxvalu, name: "MaxValu (แม็กซ์แวลู)", limit: "49,000.00", hours: "24 ชม.", note: "-" },
    { img: IMAGES.jiffy, name: "Jiffy (จิฟฟี่)", limit: "30,000.00", hours: "24 ชม.", note: "-" },
    {
        img: IMAGES.jaymart,
        name: "Jaymart (เจมาร์ท)",
        limit: "49,000.00",
        hours: "9.00 - 17.00 น. (นอกห้าง)\n11.00 - 19.00 น. (ในห้าง)",
        note: "เฉพาะเคาน์เตอร์ที่ร่วมรายการเท่านั้น",
        rowSpan: 3,
    },
    { img: IMAGES.srisawad, name: "Srisawad (ศรีสวัสดิ์)", limit: "49,000.00", hours: "8.00 - 16.30 น." },
    { img: IMAGES.taweeyon, name: "Thaweeyont (ทวียนต์)", limit: "49,000.00", hours: "8.00 - 16.30 น." },
    {
        img: IMAGES.kasikorn,
        name: "เคาน์เตอร์ธนาคารกสิกรไทย จำกัด(มหาชน)",
        limit: "49,000.00",
        hours: "-",
        note: "เป็นไปตามเวลาเปิด-ปิดแต่ละสาขา",
    },
];

const mobileApps = [
    { img: IMAGES.kSME, name: "K PLUS SME", small: true },
    { img: IMAGES.kplus, name: "K PLUS", kplus: true },
];

const internetBanking = [
    { img: IMAGES.kBiz, name: "K BIZ", small: true },
    { img: IMAGES.kasikorn, name: "K-Cash Connect Plus", hours: "6.00 - 20.00 น.", kplus: true },
];

function PremiumPACounterBillTable() {
    const renderHeader = (title: string) => (
        <TableHead sx={{ backgroundColor: "#1db0e6" }}>
            <TableRow>
                <TableCell align="center" colSpan={4}>
                    <Typography sx={{ color: "#fff" }}>{title}</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );

    const renderRow = (item: any, index: number) => {
        let ImgComponent = Img;
        if (item.kplus) ImgComponent = KPlusImg;
        else if (item.small) ImgComponent = SmallImg;
        return (
            <TableRow key={index}>
                <FlexCell align="center">
                    <ImgComponent src={item.img} alt={`${item.name} Logo`} />
                    <Text style={item.kplus ? { marginLeft: -7 } : { whiteSpace: "nowrap" }}>{item.name}</Text>
                </FlexCell>
                <TableCell align="center">
                    <Text>{item.limit || "49,000.00"}</Text>
                </TableCell>
                <TableCell align="center">
                    <Text style={{ whiteSpace: "pre-line" }}>{item.hours || "00.00 - 23.00 น."}</Text>
                </TableCell>
                {item.rowSpan ? (
                    <TableCell align="center" rowSpan={item.rowSpan}>
                        <Text>{item.note}</Text>
                    </TableCell>
                ) : !item.name.includes("Srisawad") && !item.name.includes("Thaweeyont") ? (
                    <TableCell align="center">
                        <Text>{item.note || "-"}</Text>
                    </TableCell>
                ) : null}
            </TableRow>
        );
    };

    return (
        <Box>
            <Typography fontWeight="bold">ผู้ให้บริการชำระเงิน :</Typography>
            <TableContainer component={Paper} sx={{ mt: 1.25 }}>
                <StyledTable size="small">
                    <TableHead sx={{ backgroundColor: "#1db0e6" }}>
                        <TableRow>
                            {["ช่องทางการรับชำระเงิน", "ธุรกรรมสูงสุด", "เวลาทำการ", "หมายเหตุ"].map((header, idx) => (
                                <TableCell key={header} align="center">
                                    <Typography sx={{ color: "#fff" }}>
                                        {header}
                                        {idx === 1 && (
                                            <>
                                                <br />
                                                <BahtPerTxn>(บาท / รายการ)</BahtPerTxn>
                                            </>
                                        )}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{paymentMethods.map(renderRow)}</TableBody>
                    {renderHeader("Mobile Application")}
                    <TableBody>{mobileApps.map(renderRow)}</TableBody>
                    {renderHeader("Internet Banking")}
                    <TableBody>{internetBanking.map(renderRow)}</TableBody>
                </StyledTable>
            </TableContainer>
        </Box>
    );
}

export default PremiumPACounterBillTable;
