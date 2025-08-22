import { ReactNode, useState, useEffect } from "react";
import {
    Box,
    Button,
    ButtonProps,
    Container,
    Dialog,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogProps,
    DialogTitle,
    DialogTitleProps,
    Grid,
    Paper,
    PaperProps,
    Popover,
    styled,
    SxProps,
    Tooltip,
    tooltipClasses,
    TooltipProps,
    Typography,
} from "@mui/material";
import { Theme } from "@mui/material";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

// ✅ MainPaper
type MainPaperProps = Omit<PaperProps, "children"> & {
    children: ReactNode;
};

export const MainPaper = ({ children, ...props }: MainPaperProps) => {
    return (
        <Paper elevation={1} sx={{ p: "1.5rem", lineHeight: "50px", mb: "1.5rem" }} {...props}>
            {children}
        </Paper>
    );
};

type ContentContainerProps = {
    children: React.ReactNode;
};

export const ContentContainer = ({ children }: ContentContainerProps) => {
    return (
        <Box
            sx={(theme) => ({
                width: "100%", // Default for mobile devices
                [theme.breakpoints.up("sm")]: {
                    width: "85%", // For  tablets and above
                    maxWidth: "900px",
                },
                alignSelf: "center",
                margin: "0 auto",
            })}
        >
            {children}
        </Box>
    );
};

type ColorType = "primary" | "success" | "error" | "warning" | "info" | "default";

type ButtonsProps = ButtonProps & {
    colorType?: ColorType;
};

export const Buttons = styled(({ colorType, ...rest }: ButtonsProps) => <Button {...rest} />)(({
    theme,
    colorType = "primary",
    variant = "contained",
}) => {
    let backgroundColor = theme.palette.primary.main;
    let hoverColor = theme.palette.primary.dark;
    switch (colorType) {
        case "success":
            backgroundColor = theme.palette.success.main;
            hoverColor = theme.palette.success.light;
            break;
        case "error":
            backgroundColor = theme.palette.error.main;
            hoverColor = theme.palette.error.dark;
            break;
        case "warning":
            backgroundColor = theme.palette.warning.main;
            hoverColor = theme.palette.warning.dark;
            break;
        case "info":
            backgroundColor = theme.palette.info.main;
            hoverColor = theme.palette.info.dark;
            break;
        case "default":
            backgroundColor = theme.palette.grey[500];
            hoverColor = theme.palette.grey[700];
            break;
        // primary is already default
    }

    return {
        // height: 40,
        fontSize: 14,
        backgroundColor,
        ...(variant === "contained" && {
            "&:hover": {
                backgroundColor: hoverColor,
            },
        }),
    };
});

export const RequiredAsterisk = () => {
    return (
        <Box
            component="span"
            sx={{
                color: "error.main", // สีแดงจาก theme
                ml: 0.5, // margin-left เล็กน้อย
                fontSize: 14,
            }}
        >
            *
        </Box>
    );
};

// ✅ DialogWrapper
type DialogWrapperProps = DialogProps & {
    children: ReactNode;
};

export const DialogWrapper = ({ children, ...props }: DialogWrapperProps) => {
    return (
        <Dialog
            {...props}
            PaperProps={{
                sx: {
                    // p: 2,
                    borderRadius: 3, // 2 = 16px (MUI spacing scale)
                    ...props.PaperProps?.sx, // เผื่อจะส่ง custom sx เพิ่ม
                },
                ...props.PaperProps,
            }}
        >
            {children}
        </Dialog>
    );
};

type DialogTitleWrapperProps = DialogTitleProps & {
    children: ReactNode;
};

export const DialogTitleWrapper = ({ children, ...props }: DialogTitleWrapperProps) => {
    return (
        <DialogTitle
            sx={{
                fontSize: 22,
                ...props.sx, // รองรับการปรับแต่งเพิ่มจากภายนอก
            }}
            {...props}
        >
            {children}
        </DialogTitle>
    );
};

type DialogContentWrapperProps = DialogContentProps & {
    children: ReactNode;
};

export const DialogContentWrapper = ({ children, ...props }: DialogContentWrapperProps) => {
    return (
        <DialogContent
            sx={{
                pl: 3,
                pr: 3,
                ...props.sx, // รองรับการปรับแต่งเพิ่มจากภายนอก
            }}
            {...props}
        >
            {children}
        </DialogContent>
    );
};

type DialogActionsWrapperProps = DialogActionsProps & {
    children: ReactNode;
};

export const DialogActionsWrapper = ({ children, ...props }: DialogActionsWrapperProps) => {
    return (
        <DialogActions
            sx={{
                pl: 3,
                pr: 3,
                ...props.sx, // รองรับการปรับแต่งเพิ่มจากภายนอก
            }}
            {...props}
        >
            {children}
        </DialogActions>
    );
};

type CircularIconProps = {
    children: ReactNode;
    size?: number; // ขนาดของวงกลม
    color?: string; // สีของวงกลม
    iconColor?: string; // สีของไอคอน
};

export const CircularIcon = ({
    children,
    size = 40, // ขนาด default
    color = "primary.main", // สีพื้นหลัง default
    iconColor = "inherit", // สีไอคอน default
}: CircularIconProps) => {
    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: color,
                color: iconColor,
            }}
        >
            {children}
        </Box>
    );
};

type SqureIconProps = {
    children: ReactNode;
    size?: number;
    color?: string;
    iconColor?: string;
    sx?: SxProps<Theme>; // ✅ รองรับ sx เพิ่มเติม
};

export const SqureIcon = ({
    children,
    size = 40,
    color = "primary.main",
    iconColor = "inherit",
    sx = {},
}: SqureIconProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: size,
                height: size,
                borderRadius: "10%", // square-ish style
                backgroundColor: color,
                color: iconColor,
                ...sx, // ✅ merge sx จากภายนอก
            }}
        >
            {children}
        </Box>
    );
};

export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: "0.5rem",
    color: theme.palette.text.primary,
    lineHeight: "50px",
}));

export const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

export const PopoverStyled = styled(Popover)(() => ({
    "& .MuiPaper-root": {
        boxShadow: "none",
        border: "2px solid #007AC1",
    },
}));

export const PopoverButtonStyled = styled(Button)(() => ({
    backgroundColor: "#ffffff",
    color: "#000000",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    border: "none",
    borderRadius: 1,
    " &:hover": {
        backgroundColor: "#007AC1",
        color: "#ffffff",
    },
    "&:focus": {
        backgroundColor: "#007AC1",
        color: "#ffffff",
    },
}));

// Content Box Component
type ContentBoxProps = {
    children: ReactNode;
    sx?: SxProps<Theme>; // เพื่อให้สามารถ override styling ได้
};

export const ContentBox = ({ children, sx = {} }: ContentBoxProps) => {
    return (
        <Box
            sx={{
                // Default styling
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                padding: 3.5,
                borderRadius: 2,
                textAlign: "center",
                borderColor: "#1DB0E6",
                borderWidth: 1,
                borderStyle: "solid",
                margin: "auto",
                // Merge with custom props
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

// Main Layout Component with customizable background
type MainLayoutProps = {
    children?: React.ReactNode; // ทำให้ children เป็น optional
    backgroundImage?: string;
    headerComponent?: React.ReactNode;
    footerComponent?: React.ReactNode;
    contentComponent?: React.ReactNode; // เพิ่ม props สำหรับส่งทั้ง content section มาจากข้างนอก
    // Legacy props for backward compatibility (เก็บไว้เพื่อ backward compatibility)
    contentBoxProps?: SxProps<Theme>;
    headerLogo?: string;
    footerCallCenter?: string;
    footerSocialLinks?: Array<{
        href: string;
        src: string;
        alt: string;
        width?: number;
        height?: number;
    }>;
};

export const MainLayout = ({
    children,
    backgroundImage,
    headerComponent,
    footerComponent,
    headerLogo,
    footerCallCenter = "Call Center โทร 1434",
    footerSocialLinks = [
        {
            href: "https://www.facebook.com/siamsmilebroker/",
            src: "/images/SocialMedia/facebook.png",
            alt: "Facebook",
        },
        {
            href: "https://www.youtube.com/channel/UC-x4bdgWZCeYqJO5RBFkg7w",
            src: "/images/SocialMedia/youtube.png",
            alt: "YouTube",
        },
        {
            href: "https://line.me/R/ti/p/%40siamsmile",
            src: "/images/SocialMedia/line.png",
            alt: "LINE",
            width: 32.5,
            height: 32.5,
        },
        {
            href: "https://www.siamsmilebroker.co.th/",
            src: "/images/SocialMedia/siamsmile.png",
            alt: "Website",
        },
    ],
}: MainLayoutProps) => {
    const { height } = useWindowDimensions();

    return (
        <Paper
            elevation={3}
            square
            sx={{
                width: "100%",
                backgroundSize: "100%",
                backgroundRepeat: "repeat",
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minHeight: height,
            }}
        >
            {/* Use custom header component if provided, otherwise use default */}
            {headerComponent || <Header logoSrc={headerLogo} />}

            {/* Use custom content component if provided, otherwise use default */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</Box>

            {/* Use custom footer component if provided, otherwise use default */}
            {footerComponent || <Footer callCenterText={footerCallCenter} socialLinks={footerSocialLinks} />}
        </Paper>
    );
};

// Header Component
export const HeaderWithPayerName = ({
    payerName,
    logoSrc = "/images/SiamSmile/Siamsmilelogo_man_white.png",
}: {
    payerName?: string;
    logoSrc?: string;
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                height: 40,
                padding: 0,
                backgroundColor: "#0095FF",
                position: "fixed",
                width: "100%",
                left: 0,
                top: 0,
                zIndex: 1000,
                borderRadius: 0,
            }}
        >
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: 40 }}>
                <Box
                    component="img"
                    src={logoSrc}
                    alt="Siam Smile Logo"
                    sx={{
                        margin: "auto",
                        display: "block",
                        width: 27,
                        height: 60,
                        maxWidth: "80%",
                        maxHeight: "80%",
                    }}
                />
            </Grid>
            {payerName && (
                <Grid
                    item
                    xs={12}
                    sx={{
                        padding: "5px",
                        backgroundColor: "#fff",
                        textAlign: "right",
                    }}
                >
                    <Box
                        sx={{
                            fontSize: 14,
                            fontFamily: "Sarabun, sans-serif",
                            color: "#000",
                        }}
                    >
                        ผู้ชำระเบี้ย : {payerName}
                    </Box>
                </Grid>
            )}
        </Paper>
    );
};

// Header Component (simple style like footer)
export const Header = ({
    logoSrc = "/images/SiamSmile/Siamsmilelogo_man_white.png",
    textHeader = "",
}: {
    logoSrc?: string;
    textHeader?: string;
}) => (
    <Box
        sx={{
            height: 40,
            backgroundColor: "#0095FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 3,
            borderRadius: 1.5,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        }}
    >
        {logoSrc && (
            <>
                <Box
                    component="img"
                    src={logoSrc}
                    alt="Logo"
                    sx={{
                        width: 27,
                        height: 35,
                        maxWidth: "80%",
                        maxHeight: "80%",
                    }}
                />
                <Typography
                    sx={{ color: "#fff", fontSize: "1.1rem", ml: 1, mt: -0.4, display: textHeader ? "block" : "none" }}
                >
                    {textHeader}
                </Typography>
            </>
        )}
    </Box>
);

// Footer Component
export const Footer = ({
    callCenterText = "Call Center โทร 1434",
    socialLinks = [],
}: {
    callCenterText?: string;
    socialLinks?: Array<{
        href: string;
        src: string;
        alt: string;
        width?: number;
        height?: number;
    }>;
}) => (
    <Box
        sx={{
            height: 40,
            backgroundColor: "#0095FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            borderRadius: 1.5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
        }}
    >
        <Box sx={{ color: "#fff", fontSize: "0.75rem", fontWeight: "bold" }}>{callCenterText}</Box>
        <Box sx={{ display: "flex", gap: 0.5, mt: 0.6 }}>
            {socialLinks.map((item, index) => (
                <Box
                    key={index}
                    component="a"
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    sx={{ display: "block", border: "none", mt: 0.2 }}
                >
                    <Box
                        component="img"
                        src={item.src}
                        alt={item.alt}
                        sx={{
                            width: item.width || 30,
                            height: item.height || 30,
                            mt: item.alt === "LINE" ? -0.1 : 0,
                        }}
                    />
                </Box>
            ))}
        </Box>
    </Box>
);

export const PaySlipContainer = ({
    isDownloading = false,
    imageRef,
    children,
}: {
    isDownloading?: boolean;
    imageRef?: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}) => (
    <Box
        sx={{
            background: "linear-gradient(to bottom, rgba(28, 176, 230, 1), rgb(255, 249, 196, 0.6))",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: {
                xs: 1,
                sm: 2,
            },
            width: "100%",
        }}
    >
        <Grid
            sx={{
                ...(isDownloading && {
                    background: "linear-gradient(to bottom, rgba(28, 176, 230, 1), rgb(255, 249, 196, 0.6))",
                    borderRadius: 2,
                }),
            }}
            ref={imageRef}
        >
            <Container
                sx={{
                    width: {
                        xs: "100%",
                        sm: "430px",
                        md: "470px",
                        lg: "470px",
                    },
                    maxWidth: {
                        xs: "380px",
                        sm: "430px",
                        md: "470px",
                        lg: "470px",
                    },
                    px: 2,
                }}
            >
                {children}
            </Container>
        </Grid>
    </Box>
);
