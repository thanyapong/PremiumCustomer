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
    topmarket: "/images/PA/Cenpay/topmarket.png",
    b2s: "/images/PA/Cenpay/b2s.png",
    powerbuy: "/images/PA/Cenpay/powerbuy.png",
    central: "/images/PA/Cenpay/central.png",
    familyMart: "/images/PA/Cenpay/familyMart.png",
    baanAndBeyond: "/images/PA/Cenpay/baanAndBeyond.png",
    officeMate: "/images/PA/Cenpay/officeMate.png",
    thaiwatsadu: "/images/PA/Cenpay/thaiwatsadu.png",
    robinson: "/images/PA/Cenpay/robinson.png",
    homeworks: "/images/PA/Cenpay/homeworks.png",
    segafredoZanetti: "/images/PA/Cenpay/segafredoZanetti.png",
    matsumotoKiyoshi: "/images/PA/Cenpay/matsumotoKiyoshi.png",
    centralFood: "/images/PA/Cenpay/centralFood.png",
} as const;

const StyledTable = styled(Table)({
    minWidth: 650,
    "& .MuiTableCell-root": { borderRight: "1px solid rgba(224, 224, 224, 1)" },
});

const ImgTopMarket = styled("img")({
    width: 70,
    height: 70,
    maxWidth: "80%",
    maxHeight: "80%",
    marginRight: 10,
    borderRadius: 10,
    marginTop: 11,
    marginBottom: 7,
});
const ImgBannAndBeyond = styled("img")({
    width: 52,
    height: 52,
    maxWidth: "80%",
    maxHeight: "80%",
    marginRight: 20,
    marginLeft: 9,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 7,
});
const ImgCentralFood = styled("img")({
    width: 51,
    height: 51,
    marginLeft: 10,
    marginRight: 20,
    marginTop: 8,
    marginBottom: 8,
});
const CenpayDetailsCell = styled(TableCell)(({ theme }) => ({
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
        fontSize: 12,
    },
}));
const FontSizeCell = styled(TableCell)({
    fontSize: 13,
});

const BahtPerTxn = styled("span")({ whiteSpace: "nowrap" });

const paymentMethods = [
    { img: IMAGES.topmarket, name: "Tops (ท็อปส์ มาร์เก็ต)", imgType: "topMarket" },
    { img: IMAGES.b2s, name: "B2S (บีทูเอส)", imgType: "topMarket" },
    { img: IMAGES.powerbuy, name: "Power Buy (เพาเวอร์บาย)", imgType: "topMarket" },
    { img: IMAGES.central, name: "Central (เซ็นทรัล)", imgType: "topMarket" },
    { img: IMAGES.familyMart, name: "FamilyMart (แฟมิลี่มาร์ท)", imgType: "topMarket" },
    { img: IMAGES.baanAndBeyond, name: "BAAN AND BEYOND (บ้านแอนต์บียอนต์)", imgType: "bannAndBeyond" },
    { img: IMAGES.officeMate, name: "Office Mate (ออฟฟิศเมท)", imgType: "topMarket" },
    { img: IMAGES.thaiwatsadu, name: "Thai Watsadu (ไทวัสดุ)", imgType: "topMarket" },
    { img: IMAGES.robinson, name: "Robinson (โรบินสัน)", imgType: "topMarket" },
    { img: IMAGES.homeworks, name: "Home Works (โฮมเวิร์ค)", imgType: "topMarket" },
    { img: IMAGES.segafredoZanetti, name: "Segafredo Zanetti (เซกาเฟรโด ซาเนตติ)", imgType: "topMarket" },
    { img: IMAGES.matsumotoKiyoshi, name: "Matsumoto Kiyoshi (มัทสึโมโตะ คิโยซิ)", imgType: "topMarket" },
    { img: IMAGES.centralFood, name: "Central Food (เซ็นทรัล ฟู้ด)", imgType: "centralFood" },
];

const CenpayDetails = () => {
    const renderImg = (item: any) => {
        if (item.imgType === "bannAndBeyond") return <ImgBannAndBeyond src={item.img} alt={item.name + " logo"} />;
        if (item.imgType === "centralFood") return <ImgCentralFood src={item.img} alt={item.name + " logo"} />;
        return <ImgTopMarket src={item.img} alt={item.name + " logo"} />;
    };
    return (
        <Box>
            <Typography fontWeight="bold">ผู้ให้บริการชำระเงิน :</Typography>
            <TableContainer component={Paper} sx={{ mt: 1.25 }}>
                <StyledTable size="small">
                    <TableHead sx={{ backgroundColor: "#1db0e6" }}>
                        <TableRow>
                            <TableCell align="center">
                                <Typography sx={{ color: "#fff" }}>ช่องทางการรับชำระเงิน</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography sx={{ color: "#fff" }}>
                                    ธุรกรรมสูงสุด
                                    <br />
                                    <BahtPerTxn>(บาท / รายการ)</BahtPerTxn>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paymentMethods.map((item, idx) => (
                            <TableRow key={idx}>
                                <CenpayDetailsCell align="center">
                                    {renderImg(item)}
                                    {item.name}
                                </CenpayDetailsCell>
                                <FontSizeCell align="center">49,000.00</FontSizeCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </Box>
    );
};

export default CenpayDetails;
