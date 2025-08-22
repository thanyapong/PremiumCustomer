import { useState } from "react";
import { PaySlipResponseDtoServiceResponse } from "../../../../api/prmApi.Client";
import { encodeImg } from "../../../_common/helpersFunction";
import { PAPaySlipPDF } from "../../../PDF/PaySlip/PAPaySlipPDF";

const siamSmileLogo = "/images/BillPaymentPDF/SiamSmile/SiamSmileLogo.png";

type PaySlipActionButtonHookProps = {
    paySlipData?: PaySlipResponseDtoServiceResponse;
};

const usePaySlipActionButtonHook = ({ paySlipData }: PaySlipActionButtonHookProps) => {
    const [isPDFDownloading, setIsPDFDownloading] = useState(false);

    const handleEncodeImg = async () => {
        try {
            // Encode static images
            const encodedSiamSmileLogoImage = await encodeImg(siamSmileLogo);

            return { encodedSiamSmileLogoImage };
        } catch (error) {
            console.error("Error encoding images:", error);
            throw error;
        }
    };

    const handlePaySlipPDFDownload = async () => {
        setIsPDFDownloading(true);

        try {
            const encodedData = await handleEncodeImg();

            PAPaySlipPDF({
                paySlipData,
                encodedData,
            });
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsPDFDownloading(false);
        }
    };

    return { handlePaySlipPDFDownload, isPDFDownloading };
};

export default usePaySlipActionButtonHook;
