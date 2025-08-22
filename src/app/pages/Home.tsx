import { Typography } from "@mui/material";
import { Footer, Header, MainLayout } from "../modules/_common/commonDesign";
import { CenteredContent } from "../modules/_common/components";
import { APP_INFO } from "../../Const";

const backgroundImage: string = "/images/SiamSmile/BPbackground.png";
const headerImage: string = "/images/SiamSmile/Siamsmilelogo_man_white.png";
const facebookImage: string = "/images/SocialMedia/facebook.png";
const youtubeImage: string = "/images/SocialMedia/youtube.png";
const lineImage: string = "/images/SocialMedia/line.png";
const websiteImage: string = "/images/SocialMedia/siamsmile.png";

const footerCallCenter: string = "Call Center โทร 1434";
const facebookLink: string = "https://www.facebook.com/siamsmilebroker/";
const youtubeLink: string = "https://www.youtube.com/channel/UC-x4bdgWZCeYqJO5RBFkg7w";
const lineLink: string = "https://line.me/R/ti/p/%40siamsmile";
const websiteLink: string = "https://www.siamsmilebroker.co.th/";

const Home = () => {
    const { version } = APP_INFO;

    return (
        <MainLayout
            backgroundImage={backgroundImage}
            headerComponent={<Header logoSrc={headerImage} />}
            footerComponent={
                <Footer
                    callCenterText={footerCallCenter}
                    socialLinks={[
                        {
                            href: facebookLink,
                            src: facebookImage,
                            alt: "Facebook",
                        },
                        {
                            href: youtubeLink,
                            src: youtubeImage,
                            alt: "YouTube",
                        },
                        {
                            href: lineLink,
                            src: lineImage,
                            alt: "LINE",
                            width: 32.5,
                            height: 32.5,
                        },
                        {
                            href: websiteLink,
                            src: websiteImage,
                            alt: "Website",
                        },
                    ]}
                />
            }
            children={
                <CenteredContent
                    boxSx={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        padding: 5,
                        borderRadius: 3,
                        textAlign: "center",
                        borderColor: "#47B5F9",
                        borderWidth: 2,
                        borderStyle: "solid",
                        margin: "auto",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h3" component="h1" gutterBottom color="primary">
                        Premium Customer [{version}]
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        ยินดีต้อนรับสู่ระบบชำระเงินของลูกค้า Siam Smile
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        สำหรับการใช้งานจริง กรุณาเข้าผ่าน URL จาก SMS เท่านั้น
                    </Typography>
                </CenteredContent>
            }
        />
    );
};

export default Home;

