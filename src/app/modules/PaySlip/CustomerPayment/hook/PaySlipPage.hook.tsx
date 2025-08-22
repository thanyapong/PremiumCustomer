import { useParams } from "react-router-dom";
import { useGetPaySlipBySummaryDetailCode } from "../paySlipApi";
import { decodeBase64 } from "../../../_common/helpersFunction";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { swalError } from "../../../_common";

const usePaySlipPageHook = () => {
    const imageRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    const { summaryDetailCode } = useParams();

    const { data, isLoading, error } = useGetPaySlipBySummaryDetailCode(decodeBase64(summaryDetailCode as string));

    const handleImageDownload = useCallback(async () => {
        if (!imageRef.current || isDownloading) return;

        setIsDownloading(true);

        try {
            const dataUrl = await toPng(imageRef.current, {
                cacheBust: true,
                quality: 0.95,
                style: {
                    transform: "scale(1)",
                    transformOrigin: "top left",
                },
            });

            const link = document.createElement("a");
            link.download = `PaySlip.jpg`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            swalError("Failed to download image", "");
        } finally {
            setIsDownloading(false);
        }
    }, [isDownloading]);

    return { data, isLoading, error, imageRef, isDownloading, handleImageDownload };
};

export default usePaySlipPageHook;
