import { useState } from "react";
import { GetPaySlipDto_Response } from "../../../../api/prmApi.Client";
import { encodeImg } from "../../../_common/helpersFunction";
import { PaySlipPDF } from "../../../PDF/PaySlip/PaySlipPDF";

const siamSmileLogo = "/images/BillPaymentPDF/SiamSmile/SiamSmileLogo.png";

const normalizeProductGroupName = (name?: string): string => {
    const lowerName = name?.toLowerCase();
    if (!lowerName) return "-";

    const mapping = [
        ["ph", "ประกันสุขภาพ"],
        ["p30", "ประกันอุบัติเหตุ PA30"],
        ["pa30", "ประกันอุบัติเหตุ PA30"],
        ["pl", "ประกันชีวิต"],
        ["house", "ประกันบ้าน"],
        ["smilepa", "เบ็ดเตล็ด - SmilePA"],
        ["ta", "เบ็ดเตล็ด - TA"],
        ["golf", "เบ็ดเตล็ด - Golf"],
        ["home", "เบ็ดเตล็ด - Home"],
        ["criticalillness", "ประกันโรคร้ายแรง"],
    ];

    for (const [key, value] of mapping) {
        if (lowerName.includes(key)) return value;
    }

    return name && (name.includes("ภาคบังคับ CMI") || name.includes("ภาคสมัครใจ VMI")) ? "ประกันรถยนต์" : "-";
};

type PaySlipActionButtonHookProps = {
    payslipData?: GetPaySlipDto_Response[];
};

const usePaySlipActionButtonHook = ({ payslipData }: PaySlipActionButtonHookProps) => {
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

            // Normalize payslipData productGroupName
            const normalizedPayslipData = JSON.parse(JSON.stringify(payslipData));

            normalizedPayslipData?.forEach((item: any) => {
                if (item.refDebHeader?.refDebtDetail) {
                    item.refDebHeader.refDebtDetail.forEach((debtDetail: any) => {
                        if (debtDetail.productGroupName) {
                            debtDetail.productGroupName = normalizeProductGroupName(debtDetail.productGroupName);
                        }
                    });
                }
            });

            PaySlipPDF({
                payslipData: normalizedPayslipData as GetPaySlipDto_Response[],
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
