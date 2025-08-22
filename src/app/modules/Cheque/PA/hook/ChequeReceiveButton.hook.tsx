import { useState } from "react";
import { BillPaymentResponseDtoServiceResponse } from "../../../../api/prmApi.Client";
import { ChequeSlipResponseDtoListServiceResponse } from "../../../../api/prmchqApi.Client";
import { encodeImg } from "../../../_common/helpersFunction";
import { PAChequeReceive } from "../../../PDF/ChequeReceive/PAChequeReceive";

const siamSmileLogo = "/images/BillPaymentPDF/SiamSmile/SiamSmileLogo.png";

type ChequeReceiveButtonHookProps = {
    billPaymentData: BillPaymentResponseDtoServiceResponse | undefined;
    chequeSlipData: ChequeSlipResponseDtoListServiceResponse | undefined;
};

const useChequeReceiveButtonHook = ({ billPaymentData, chequeSlipData }: ChequeReceiveButtonHookProps) => {
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

            PAChequeReceive({
                billPaymentData,
                chequeSlipData,
                encodedData,
            });
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsPDFDownloading(false);
        }
    };

    return { isPDFDownloading, handlePaySlipPDFDownload };
};

export default useChequeReceiveButtonHook;
