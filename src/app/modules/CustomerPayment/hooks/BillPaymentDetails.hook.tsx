import { toPng } from "html-to-image";
import { useCallback, useRef, useState } from "react";
import {
    GetBillPaymentDto_ResponseServiceResponse,
    GetDebtDto_ResponseListServiceResponse,
} from "../../../api/prmApi.Client";
import { swalError } from "../../_common";
import { encodeImg, normalizeDebtDetails } from "../../_common/helpersFunction";
import { BillPaymentPDF } from "../../PDF/CustomerPayment/BillPaymentPDF";

// Bank and static images
const STATIC_IMAGES = {
    siamSmileLogo: "/images/BillPaymentPDF/SiamSmile/SiamSmileLogo.png",
    bpBackground: "/images/BillPaymentPDF/SiamSmile/BPbackground.jpeg",
    ktnk: "/images/BillPaymentPDF/BankIcon/KTNK.png",
    ttb: "/images/BillPaymentPDF/BankIcon/TTB.png",
    kbank: "/images/BillPaymentPDF/BankIcon/KBANK.png",
    ktb: "/images/BillPaymentPDF/BankIcon/KTB.png",
    scb: "/images/BillPaymentPDF/BankIcon/SCB.png",
    gsb: "/images/BillPaymentPDF/BankIcon/GSB.png",
    bbl: "/images/BillPaymentPDF/BankIcon/BBL.png",
    baac: "/images/BillPaymentPDF/BankIcon/BAAC.png",
    bay: "/images/BillPaymentPDF/BankIcon/BAY.png",
};

type BillPaymentDetailsHookProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_ResponseListServiceResponse;
};

const useBillPaymentDetailsHook = ({ billPaymentData, debtData }: BillPaymentDetailsHookProps) => {
    const imageRef = useRef(null);
    const [scanCodeType, setScanCodeType] = useState(1);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isPDFDownloading, setIsPDFDownloading] = useState(false);
    const { taxNo, premiumDebt, ref1, ref2 } = billPaymentData?.data?.debtHeader ?? {};

    const handleScanCodeGeneration = () => {
        if (!premiumDebt) return;

        const splitNumber = premiumDebt.toFixed(2).toString().split(".");
        const formattedNumber = splitNumber[0] + splitNumber[1];

        const qrCodeFormat = "|" + taxNo + "\r\n" + ref1 + "\r\n" + ref2 + "\r\n" + formattedNumber;

        return qrCodeFormat;
    };

    const handleScanCodeTypeChange = (type: number) => {
        setScanCodeType(type);
    };

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
            link.download = `SiamSmile_Bill_Payment.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            swalError("Failed to download image", "");
        } finally {
            setIsDownloading(false);
        }
    }, [isDownloading]);

    const handleEncodeImg = async () => {
        try {
            // Encode static images
            const encodedSiamSmileLogoImage = await encodeImg(STATIC_IMAGES.siamSmileLogo);
            const encodeBPBackgroundImage = await encodeImg(STATIC_IMAGES.bpBackground);
            const encodedBankImages = {
                ktnk: await encodeImg(STATIC_IMAGES.ktnk),
                ttb: await encodeImg(STATIC_IMAGES.ttb),
                kbank: await encodeImg(STATIC_IMAGES.kbank),
                ktb: await encodeImg(STATIC_IMAGES.ktb),
                scb: await encodeImg(STATIC_IMAGES.scb),
                gsb: await encodeImg(STATIC_IMAGES.gsb),
                bbl: await encodeImg(STATIC_IMAGES.bbl),
                baac: await encodeImg(STATIC_IMAGES.baac),
                bay: await encodeImg(STATIC_IMAGES.bay),
            };

            // Create temporary QR Code and Barcode elements for encoding
            const qrCodeValue = handleScanCodeGeneration();

            // Create QR Code element
            const qrCodeContainer = document.createElement("div");
            qrCodeContainer.innerHTML = `
                <canvas id="temp-qr-code" width="150" height="150"></canvas>
            `;
            qrCodeContainer.style.position = "absolute";
            qrCodeContainer.style.left = "-9999px";
            qrCodeContainer.style.top = "-9999px";
            document.body.appendChild(qrCodeContainer);

            // Generate QR Code using QRCode library
            const QRCode = await import("qrcode");
            const qrCanvas = qrCodeContainer.querySelector("#temp-qr-code") as HTMLCanvasElement;
            await QRCode.toCanvas(qrCanvas, qrCodeValue as string, {
                width: 150,
                margin: 1,
                color: {
                    dark: "#00202e",
                    light: "#ffffff",
                },
            });

            // Create Barcode element
            const barcodeContainer = document.createElement("div");
            barcodeContainer.style.position = "absolute";
            barcodeContainer.style.left = "-9999px";
            barcodeContainer.style.top = "-9999px";
            document.body.appendChild(barcodeContainer);

            // Generate Barcode using JsBarcode
            const JsBarcode = await import("jsbarcode");
            const barcodeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            JsBarcode.default(barcodeSvg, qrCodeValue as string, {
                displayValue: true,
                fontSize: 20,
                margin: 0,
            });
            barcodeContainer.appendChild(barcodeSvg);

            console.log("Temporary elements created for encoding:", {
                qrCode: !!qrCanvas,
                barcode: !!barcodeSvg,
                qrCodeValue,
            });

            // Encode both QR Code and Barcode
            const [encodedQRCode, encodedBarcode] = await Promise.all([
                toPng(qrCanvas, {
                    cacheBust: false,
                    quality: 0.8,
                    pixelRatio: 1,
                }),
                toPng(barcodeSvg as any, {
                    cacheBust: false,
                    quality: 0.8,
                    pixelRatio: 1,
                }),
            ]);

            // Clean up temporary elements
            document.body.removeChild(qrCodeContainer);
            document.body.removeChild(barcodeContainer);

            return {
                encodedSiamSmileLogoImage,
                encodedBankImages,
                encodeBPBackgroundImage,
                encodedQRCode,
                encodedBarcode,
            };
        } catch (error) {
            console.error("Error encoding images:", error);
            throw error;
        }
    };

    const normalizeDebtDetailsForPDF = () => {
        const { debtDetails, ...otherData } = debtData?.data?.[0] ?? {};
        const normalizedDebtDetails = normalizeDebtDetails(debtDetails as any[]);

        return [
            {
                ...otherData,
                debtDetails: normalizedDebtDetails,
            },
        ];
    };

    const handleBillPaymentPDFDownload = async () => {
        if (!imageRef.current || isPDFDownloading) return;

        setIsPDFDownloading(true);

        try {
            const encodedData = await handleEncodeImg();
            const normalizedDebtDetails = normalizeDebtDetailsForPDF();

            BillPaymentPDF({
                billPaymentData,
                debtData: normalizedDebtDetails,
                encodedData,
            });
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsPDFDownloading(false);
        }
        // Here you would typically create a PDF using the encoded images and normalized data
    };

    return {
        handleScanCodeGeneration,
        scanCodeType,
        setScanCodeType,
        handleScanCodeTypeChange,
        imageRef,
        handleImageDownload,
        isDownloading,
        isPDFDownloading,
        handleBillPaymentPDFDownload,
    };
};

export default useBillPaymentDetailsHook;
