import { Grid, Paper } from "@mui/material";
import { PaySlipContainer } from "../../../_common/commonDesign";
import Error from "../../../Status/pages/Error";
import Loading from "../../../Status/pages/Loading";
import usePAPaySlipPageHook from "../hook/PAPaySlipPage.hook";
import PaySlipHeader from "../../CustomerPayment/components/PaySlipHeader";
import PaySlipDetailsHeader from "../../CustomerPayment/components/PaySlipDetailsHeader";
import PaySlipDetails from "../components/PaySlipDetails";
import PaySlipSocialMedia from "../../CustomerPayment/components/PaySlipSocialMedia";
import PaySlipActionButton from "../components/PaySlipActionButton";

const PAPaySlipPage = () => {
    const { data, isLoading, error, imageRef, isDownloading, handleImageDownload } = usePAPaySlipPageHook();

    if (isLoading) return <Loading />;

    if (error) return <Error />;

    return (
        <PaySlipContainer isDownloading={isDownloading} imageRef={imageRef}>
            <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                sx={{ mb: isDownloading ? 2.5 : 0 }}
            >
                <Grid item xs={12} sx={{ mt: isDownloading ? 1.5 : 0 }}>
                    <PaySlipHeader />
                </Grid>
                <Grid item xs={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            backgroundColor: "#fff",
                            width: "100%",
                            mt: 2.3,
                            p: 3,
                            borderRadius: 2,
                        }}
                    >
                        <PaySlipDetailsHeader />
                        <PaySlipDetails paySlipData={data} />
                    </Paper>
                </Grid>
            </Grid>
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: "#fff",
                    width: "100%",
                    mt: 2.3,
                    p: 3,
                    pt: 1.5,
                    pb: 1.5,
                    borderRadius: 2,
                    display: isDownloading ? "none" : "block",
                }}
            >
                <PaySlipSocialMedia />
            </Paper>
            <Grid component={"div"} sx={{ display: isDownloading ? "none" : "block" }}>
                <PaySlipActionButton
                    paySlipData={data}
                    handleImageDownload={handleImageDownload}
                    isDownloading={isDownloading}
                />
            </Grid>
        </PaySlipContainer>
    );
};

export default PAPaySlipPage;
