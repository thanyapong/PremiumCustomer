import {
    AppBar,
    Breadcrumbs,
    Divider,
    Slide,
    Stack,
    Toolbar,
    Typography,
    styled,
    useScrollTrigger,
} from "@mui/material";
import React from "react";
import { Link, useLocation, useMatches } from "react-router-dom";
import { RouteHandleType } from "../../routes";

const TitleAppToolbar = styled(Toolbar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const TitleAppPageTitle = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "1.2rem",
}));

const HideDiv = styled("div")<{ trigger: boolean }>(({ trigger }) => ({
    display: trigger ? "none" : "block",
}));

type HideOnScrollProps = {
    children: React.ReactNode;
    windows?: Window;
};

const HideOnScroll = ({ children, windows }: HideOnScrollProps) => {
    const trigger = useScrollTrigger({ target: windows ?? undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <HideDiv trigger={trigger}>{children}</HideDiv>
        </Slide>
    );
};

const Breadcrumb = () => {
    const location = useLocation();
    const matches = useMatches();

    const crumbs = matches.filter((match) => !match.pathname.endsWith("/"));

    return (
        <TitleAppToolbar variant="dense">
            <Breadcrumbs aria-label="breadcrumb">
                {crumbs.map((crumb, index) => {
                    const handle = crumb.handle as RouteHandleType;

                    let title = handle.title;
                    if (handle.getTitle && crumb.data) title = handle.getTitle(crumb.data);

                    return index === crumbs.length - 1 ? (
                        <Typography color="textPrimary" key={crumb.pathname}>
                            {title}
                        </Typography>
                    ) : (
                        <Link color="inherit" to={crumb.pathname} key={crumb.pathname}>
                            {title}
                        </Link>
                    );
                })}
                {location.pathname === "/" && (
                    <Typography color="textPrimary" key={location.pathname}>
                        <Stack direction={"row"}>Home</Stack>
                    </Typography>
                )}
            </Breadcrumbs>
        </TitleAppToolbar>
    );
};

const TitleAppBar = () => {
    const matches = useMatches();
    const crumbs = matches.filter((match) => !match.pathname.endsWith("/"));

    const HeaderBar = styled(AppBar)(({ theme }) => ({
        width: "100%",
        left: 0,
        transition: theme.transitions.create(["left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
    }));

    let pageTitle = "Customer Bill Payment";

    if (crumbs.length > 0) {
        const handle = crumbs[crumbs.length - 1].handle as RouteHandleType;

        if (handle.getTitle && crumbs[crumbs.length - 1].data) {
            pageTitle = handle.getTitle(crumbs[crumbs.length - 1].data);
        } else {
            pageTitle = handle.title;
        }
    }

    return (
        <HeaderBar position="fixed" color="default">
            <TitleAppToolbar variant="dense">
                <TitleAppPageTitle color="primary">{pageTitle}</TitleAppPageTitle>
            </TitleAppToolbar>
            <HideOnScroll>
                <Divider light />
                <Breadcrumb />
            </HideOnScroll>
        </HeaderBar>
    );
};

export default TitleAppBar;

