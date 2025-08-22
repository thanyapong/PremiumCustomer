import { Grid, Paper } from "@mui/material";
import { memo } from "react";
import PaySlipHeader from "../components/PaySlipHeader";
import PaySlipDetailsHeader from "../components/PaySlipDetailsHeader";
import PaySlipBillDetails from "../components/PaySlipBillDetails";
import usePaySlipPageHook from "../hook/PaySlipPage.hook";
import Loading from "../../../Status/pages/Loading";
import Error from "../../../Status/pages/Error";
import PaySlipProductList from "../components/PaySlipProductList";
import PaySlipSocialMedia from "../components/PaySlipSocialMedia";
import PaySlipSummary from "../components/PaySlipSummary";
import PaySlipActionButton from "../components/PaySlipActionButton";
import { PaySlipContainer } from "../../../_common/commonDesign";

const PaySlipPage = () => {
    const { data, isLoading, error, imageRef, isDownloading, handleImageDownload } = usePaySlipPageHook();

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
                        <PaySlipBillDetails payslipData={data?.data} />
                        <PaySlipProductList payslipData={data?.data} />
                        <PaySlipSummary payslipData={data?.data} />
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
                    payslipData={data?.data}
                    handleImageDownload={handleImageDownload}
                    isDownloading={isDownloading}
                />
            </Grid>
        </PaySlipContainer>
    );
};

export default memo(PaySlipPage);
