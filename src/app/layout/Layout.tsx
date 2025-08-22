import { CssBaseline, Fab, Icon, ThemeProvider, Zoom, styled, useScrollTrigger } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { ResKeyUpdator, VersionChecker } from "./components";
import theme from "./theme";

const LayoutContainer = styled("div")({
    display: "flex",
    width: "100%",
});

const LayoutContentContainer = styled("div")({
    flexGrow: 1,
    padding: 0, // Remove padding for full screen
    overflowX: "hidden",
});

const ScrollTopDiv = styled("div")(({ theme }) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
}));

const ScrollTop = ({ children }: { children: React.ReactNode }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <Zoom in={trigger}>
            <ScrollTopDiv onClick={handleClick} role="presentation">
                {children}
            </ScrollTopDiv>
        </Zoom>
    );
};

const Layout = () => {
    const selectedTheme = theme[0];

    return (
        <ThemeProvider theme={selectedTheme}>
            <LayoutContainer>
                <CssBaseline />
                <ResKeyUpdator />
                <VersionChecker />
                <LayoutContentContainer>
                    <a id="back-to-top-anchor" />
                    <Outlet />
                    <ScrollTop>
                        <Fab color="primary" size="small" aria-label="scroll back to top">
                            <Icon>keyboard_arrow_up</Icon>
                        </Fab>
                    </ScrollTop>
                </LayoutContentContainer>
            </LayoutContainer>
        </ThemeProvider>
    );
};

export default Layout;

