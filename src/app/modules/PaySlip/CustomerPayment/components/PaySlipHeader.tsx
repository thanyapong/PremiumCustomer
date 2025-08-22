import { Phone } from "@mui/icons-material";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { memo } from "react";

const siamSmileLogo = "/images/PaySlip/Siamsmilelogo_man_white.png";

const PaySlipHeader = memo(() => {
    const theme = useTheme();
    const headerTextSx = {
        fontSize: 14,
        color: "#ffffff",
        textAlign: "right",
        [theme.breakpoints.only("xs")]: {
            fontSize: 12,
        },
    };

    const companyInfo = [
        "บริษัท สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด",
        "89/6-10 ถนน เฉลิมพงษ์ แขวงสายไหม",
        "เขตสายไหม กรุงเทพมหานคร 10220",
    ];

    return (
        <Box sx={{ width: "100%" }}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <Box
                        component="img"
                        src={siamSmileLogo}
                        alt="Siam Smile Logo"
                        sx={(theme) => ({
                            width: 100,
                            height: 120,
                            mr: 2,
                            display: "block",
                            [theme.breakpoints.only("xs")]: {
                                width: 80,
                                height: 100,
                                mr: 2,
                            },
                        })}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-end",
                            mt: 2,
                        }}
                    >
                        {companyInfo.map((text, index) => (
                            <Typography key={index} sx={headerTextSx}>
                                {text}
                            </Typography>
                        ))}
                        <Typography sx={{ ...headerTextSx, display: "flex", alignItems: "center" }}>
                            <Phone sx={{ fontSize: 15, mr: 0.5 }} /> Call Center โทร 1434
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
});

export default PaySlipHeader;
