import { Backdrop, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { BillPaymentResponseDtoServiceResponse } from "../../../../api/prmApi.Client";
import { ChequeSlipResponseDtoListServiceResponse } from "../../../../api/prmchqApi.Client";
import { PictureAsPdf } from "@mui/icons-material";
import { motion } from "framer-motion"; // ถ้าใช้ framer-motion
import useChequeReceiveButtonHook from "../hook/ChequeReceiveButton.hook";

const APP_CONFIG = {
    images: {
        chequeReceive: "/images/PA/ChequeReceive/chequeReceive.png",
    },
    text: {
        thankYou: "สยามสไมล์ขอขอบคุณที่ชำระเบี้ยประกันภัย",
        contact: "หากท่านมีข้อสงสัยกรุณาติดต่อ Call Center 1434",
        downloadLabel: "ดาวน์โหลดใบรับฝากเช็ค",
    },
} as const;

type ChequeReceiveButtonProps = {
    billPaymentData: BillPaymentResponseDtoServiceResponse | undefined;
    chequeSlipData: ChequeSlipResponseDtoListServiceResponse | undefined;
};

const ChequeReceiveButton = ({ billPaymentData, chequeSlipData }: ChequeReceiveButtonProps) => {
    const { isPDFDownloading, handlePaySlipPDFDownload } = useChequeReceiveButtonHook({
        billPaymentData,
        chequeSlipData,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <Stack
                spacing={5}
                alignItems="center"
                sx={{
                    maxWidth: 600,
                    mx: "auto",
                    px: 2,
                }}
            >
                <motion.img
                    src={APP_CONFIG.images.chequeReceive}
                    alt="Cheque Receive"
                    style={{ width: "min(300px, 80vw)", height: "auto" }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                />

                <Stack spacing={2} alignItems="center">
                    <Typography
                        sx={{
                            fontSize: { xs: 15, sm: 17, md: 19, lg: 20 },
                        }}
                    >
                        {APP_CONFIG.text.thankYou}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" textAlign="center">
                        {APP_CONFIG.text.contact}
                    </Typography>
                </Stack>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        startIcon={<PictureAsPdf />}
                        variant="contained"
                        size="large"
                        sx={{
                            fontSize: { xs: 12, sm: 13, md: 14, lg: 16 },
                            mt: -1.5,
                        }}
                        onClick={() => handlePaySlipPDFDownload()}
                        disabled={isPDFDownloading}
                    >
                        {isPDFDownloading ? "กำลังดาวน์โหลด..." : `${APP_CONFIG.text.downloadLabel}`}
                    </Button>
                </motion.div>
            </Stack>
            <Backdrop open={isPDFDownloading} sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </motion.div>
    );
};

export default ChequeReceiveButton;
