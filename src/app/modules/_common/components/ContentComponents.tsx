import { Box, Grid, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

// Content Component แบบเต็มจอ
export const FullScreenContent = ({ children, sx = {} }: { children: ReactNode; sx?: SxProps<Theme> }) => (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", ...sx }}>
        <Grid item xs={12}>
            <Box sx={{ width: "100%", height: "100%", ...sx }}>{children}</Box>
        </Grid>
    </Grid>
);

// Content Component แบบกึ่งกลาง
export const CenteredContent = ({
    children,
    xs = 11,
    sm = 9,
    md = 6,
    lg = 5,
    boxSx = {},
}: {
    children: ReactNode;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    boxSx?: SxProps<Theme>;
}) => (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
            <Box
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: 4,
                    borderRadius: 2,
                    textAlign: "center",
                    borderColor: "#1DB0E6",
                    borderWidth: 1,
                    borderStyle: "solid",
                    margin: "auto",
                    ...boxSx,
                }}
            >
                {children}
            </Box>
        </Grid>
    </Grid>
);

// Content Component แบบกำหนดเอง
export const CustomContent = ({
    children,
    containerSx = {},
    gridProps = {},
    boxSx = {},
}: {
    children: ReactNode;
    containerSx?: SxProps<Theme>;
    gridProps?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    boxSx?: SxProps<Theme>;
}) => (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", ...containerSx }}>
        <Grid item xs={11} sm={9} md={6} lg={5} {...gridProps}>
            <Box sx={boxSx}>{children}</Box>
        </Grid>
    </Grid>
);
