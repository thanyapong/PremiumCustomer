import { Button, Grid } from "@mui/material";
import { GetPaySlipDto_Response } from "../../../../api/prmApi.Client";
import usePaySlipActionButtonHook from "../hook/PaySlipActionButton.hook";
import { Download, Print } from "@mui/icons-material";

type PaySlipActionButtonProps = {
    payslipData?: GetPaySlipDto_Response[];
    handleImageDownload: () => void;
    isDownloading: boolean;
};

const PaySlipActionButton = ({ payslipData, handleImageDownload, isDownloading }: PaySlipActionButtonProps) => {
    const { handlePaySlipPDFDownload, isPDFDownloading } = usePaySlipActionButtonHook({ payslipData });

    return (
        <Grid container sx={{ mt: 1 }} spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    endIcon={<Download />}
                    sx={{ backgroundColor: "#1DB0E6" }}
                    onClick={() => handleImageDownload()}
                    disabled={isDownloading}
                >
                    {isDownloading ? "กำลังดาวน์โหลด..." : "บันทึก"}
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    endIcon={<Print />}
                    sx={{ backgroundColor: "#1DB0E6" }}
                    onClick={() => handlePaySlipPDFDownload()}
                    disabled={isPDFDownloading}
                >
                    {isDownloading ? "กำลังดาวน์โหลด..." : "พิมพ์"}
                </Button>
            </Grid>
        </Grid>
    );
};

export default PaySlipActionButton;
