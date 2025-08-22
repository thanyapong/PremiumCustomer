import { Box, Grid } from "@mui/material";

const SOCIAL_MEDIA = [
    { name: "Call Center", image: "/images/PaySlip/call.png", link: "tel:1434" },
    { name: "Line", image: "/images/PaySlip/line.png", link: "https://line.me/R/ti/p/%40siamsmile" },
    { name: "Facebook", image: "/images/PaySlip/facebook.png", link: "https://www.facebook.com/siamsmilebroker/" },
    { name: "Website", image: "/images/PaySlip/web.png", link: "https://www.siamsmilebroker.co.th/" },
    {
        name: "YouTube",
        image: "/images/PaySlip/youtube.png",
        link: "https://www.youtube.com/channel/UC-x4bdgWZCeYqJO5RBFkg7w",
    },
];

const PaySlipSocialMedia = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" gap={2}>
            {SOCIAL_MEDIA.map((social) => (
                <Box
                    key={social.name}
                    component="a"
                    href={social.link}
                    sx={{
                        display: "inline-block",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            transform: "scale(1.1)",
                            filter: "brightness(1.2)",
                        },
                    }}
                >
                    <Box
                        component="img"
                        src={social.image}
                        alt={social.name}
                        sx={{
                            width: 40,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: "50%",
                            display: "block",
                        }}
                    />
                </Box>
            ))}
            {/* <Box
                component="a"
                href={`tel:${LINKS.callCenter}`}
                sx={{
                    width: 60,
                    height: 60,
                    display: "inline-block",
                    cursor: "pointer",
                    borderRadius: "50%", // กรอบนอกเป็นวงกลม
                    overflow: "hidden", // ตัดส่วนเกิน
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.1)",
                        filter: "brightness(1.2)",
                    },
                }}
            >
                <Box
                    component="img"
                    src={IMAGES.callCenter}
                    alt="Call Center"
                    sx={{
                        width: "100%", // ให้รูปขยายเต็มกรอบ
                        height: "100%",
                        objectFit: "cover", // ครอปให้พอดีกรอบ
                        display: "block",
                    }}
                />
            </Box> */}
        </Grid>
    );
};

export default PaySlipSocialMedia;
