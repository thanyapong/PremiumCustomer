// Lean utility
const STYLE = {
    header: { margin: [-3.4, 0, 0, 0] as [number, number, number, number] },
    headerDetails: { margin: [-3.4, 0, 0, 0] as [number, number, number, number] },
    total: { margin: [0, 2, 0, 0] as [number, number, number, number] },
    listDetails: { margin: [0, 5, 0, 0] as [number, number, number, number] },
    listDetailsStyle: { marginTop: 2 },
    cutPaper: { margin: [0, 0, 0, 0] as [number, number, number, number] },
    signatureAndEmployeeBankService: { margin: [0, 0, 0, 0] as [number, number, number, number] },
    ownerBillSignature: { margin: [0, 0, 0, 0] as [number, number, number, number] },
    qrCodeAndBarcode: { margin: [0, 0, 0, 0] as [number, number, number, number] },
};
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { FONTS } from "../../../../Const";
import { BillPaymentResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import { numberWithCommas } from "../../_common/helpersFunction";
import THBtext from "thai-baht-text";

(pdfMake as any).fonts = FONTS;

type BillPaymentPDFProps = {
    billPaymentData?: BillPaymentResponseDtoServiceResponse;
    encodedData: {
        encodedSiamSmileLogoImage: string;
        encodedBankImages: {
            ktnk: string;
            ttb: string;
            kbank: string;
            ktb: string;
            scb: string;
            gsb: string;
            bbl: string;
            baac: string;
            bay: string;
        };
        encodedQRCode: string | null;
        encodedBarcode: string | null;
    }; // Replace with actual type
};

export const BillPaymentPDF = ({ billPaymentData, encodedData }: BillPaymentPDFProps) => {
    const { encodedSiamSmileLogoImage, encodedQRCode, encodedBarcode, encodedBankImages } = encodedData ?? {};

    const docDefinition: TDocumentDefinitions = {
        header: HeaderPage({
            encodedSiamSmileLogoImage,
        }),
        content: [
            HeaderDetails({ billPaymentData, encodedQRCode, encodedBarcode }) as any,
            Total({ billPaymentData }),
            ListDetails({ billPaymentData }),
            CutPaper({ billPaymentData }),
            SignatureAndEmployeeBankService({ billPaymentData, encodedBankImages }),
            OwnerBillSignature({ billPaymentData }),
            QRCodeAndBarcode({ encodedQRCode, encodedBarcode }),
        ],
        styles: STYLE,
        defaultStyle: {
            font: "Sarabun",
            fontSize: 8,
            bold: true,
        },

        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [15, 100, 15, 20],
    };

    pdfMake.createPdf(docDefinition).open();
};

type HeaderPageProps = {
    encodedSiamSmileLogoImage: string;
};

const HeaderPage = ({ encodedSiamSmileLogoImage }: HeaderPageProps) => {
    return [
        {
            style: "header",
            table: {
                heights: [80, 80, 80],
                widths: [90, "*", "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [10, 8, 0, 0],
                            columns: [
                                {
                                    image: `${encodedSiamSmileLogoImage}`,
                                    width: 70,
                                },
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [0, 0, 0, 0],
                            columns: [
                                {
                                    margin: [0, 10, 0, 0],
                                    alignment: "left",
                                    text: "SIAM SMILE BROKER (THAILAND) COMPANY LIMITED\n ทะเบียน 0135551004383",
                                },
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [5, 0, 0, 0],
                            columns: [
                                {
                                    margin: [50, 10, 10, 0],
                                    alignment: "right",
                                    text: "บ.สยามสไมล์โบรกเกอร์ (ประเทศไทย) จํากัด\n 89/6-10 ชั้น 4,5 ถนนเฉลิมพงษ์\n แขวงสายไหม เขตสายไหม กรุงเทพ 10220\nCall Center 1434 หรือติดต่อ 02-533-3999",
                                },
                            ],
                        },
                    ],
                ],
            },
        },
    ];
};

const insertNewLines = (str: string, width: number) =>
    str.length > width ? str.match(new RegExp(`.{1,${width}}`, "g"))?.join("\n") : str;

type HeaderDetailsProps = {
    billPaymentData: BillPaymentResponseDtoServiceResponse | undefined;
    encodedQRCode: string | null;
    encodedBarcode: string | null;
};

const HeaderDetails = ({ billPaymentData, encodedQRCode, encodedBarcode }: HeaderDetailsProps) => {
    const { payerName, contactName, phoneNo } = billPaymentData?.data ?? {};

    return [
        {
            style: "headerDetails",
            table: {
                heights: ["*", "*"],
                widths: ["*", 330],
                body: [
                    [
                        {
                            colSpan: 1,
                            margin: [0, -5, 0, 0],
                            border: [false, false, false, false],
                            columns: [
                                [
                                    {
                                        text: `เรียน ชื่อสถานศึกษา : ${insertNewLines(payerName ?? "", 55)}`,
                                        textAlign: "left",
                                    },
                                    {
                                        text: "ชื่อครูผู้ประสานงาน : " + ` ${contactName ?? ""}`,
                                        marginLeft: 20,
                                    },
                                    {
                                        text: "เบอร์โทรศัพท์ : " + `        ${phoneNo ?? ""}`,
                                        marginLeft: 20,
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            margin: [0, -5, 0, 0],
                            border: [false, false, false, false],
                            fillColor: "#DBDBDB",
                            columns: [
                                {
                                    columns: [
                                        [
                                            {
                                                text: "ใบแจ้งชำระเบี้ย",
                                                alignment: "center",
                                                bold: true,

                                                marginTop: (payerName?.length ?? 0) < 30 ? 11 : 20,
                                            },
                                            {
                                                text: "(Bill Payment Pay-In-Slip)",
                                                alignment: "center",
                                                bold: true,
                                            },
                                        ],
                                    ],
                                },
                            ],
                        },
                    ],
                    [
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            columns: [
                                [
                                    {
                                        image: `${encodedQRCode}`,
                                        width: 85,
                                        margin: [-4, -3, 0, 0],
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            columns: [
                                {
                                    image: `${encodedBarcode}`,
                                    width: 340,
                                    margin: [-5, 0, 0, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
    ];
};

type TotalProps = { billPaymentData: BillPaymentResponseDtoServiceResponse | undefined };

const Total = ({ billPaymentData }: TotalProps) => {
    const { premiumDebt } = billPaymentData?.data || {};

    return [
        {
            style: "total",
            table: {
                margin: [0, 0, 0, 0],
                heights: [15, 15],
                widths: ["*", "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            table: {
                                widths: ["30%", "60%", "10%"],
                                body: [
                                    [
                                        {
                                            text: "ยอดที่ต้องชำระ :",
                                            alignment: "left",
                                            border: [false, false, false, false],
                                        },
                                        {
                                            text: `${numberWithCommas(premiumDebt as number) ?? "-"}`,
                                            alignment: "center",
                                            border: [false, false, false, false],
                                        },
                                        {
                                            text: "บาท",
                                            alignment: "right",
                                            border: [false, false, false, false],
                                        },
                                    ],
                                ],
                            },
                        },
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [],
                        },
                    ],
                ],
            },
        },
    ];
};

type ListDetailsProps = {
    billPaymentData: BillPaymentResponseDtoServiceResponse | undefined;
};

const ListDetails = ({ billPaymentData }: ListDetailsProps) => {
    const { productName, applicationCode, payerName, premiumDebt } = billPaymentData?.data || {};

    return [
        {
            style: "listDetails",
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*"],
                widths: ["*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [true, true, true, false],
                            borderColor: ["#000000", "#000000", "#000000", "#000000"],
                            margin: [0, 0, 10, 0],
                            fillColor: "#dbdbdb",
                            columns: [
                                [
                                    {
                                        text: "รายการ",
                                        style: "listDetailsStyle",
                                        alignment: "center",
                                    },
                                    {
                                        text: "(Description)",
                                        style: "listDetailsStyle",
                                        alignment: "center",
                                    },
                                ],
                                [
                                    {
                                        text: "จำนวนเงิน (บาท)",
                                        style: "listDetailsStyle",
                                        alignment: "right",
                                    },
                                    {
                                        text: "Amount (Baht)",
                                        style: "listDetailsStyle",
                                        alignment: "right",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
        {
            style: "listDetails",
            margin: [0, 0, 0, 0],
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*", "*"],
                widths: [400, "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [true, false, false, false],
                            margin: [10, 5, 10, 20],
                            borderColor: ["#000000", "#000000", "#000000", "#000000"],
                            columns: [
                                [
                                    {
                                        text:
                                            "ผลิตภัณฑ์ : " +
                                            `ประกันอุบัติเหตุนักเรียน ` +
                                            "แผน : " +
                                            `${productName} ` +
                                            "AppID : " +
                                            `${applicationCode === null ? "-" : applicationCode}`,

                                        style: "listDetailsStyle",
                                        alignment: "left",
                                    },
                                    {
                                        text: "ชื่อสถานศึกษา : " + `${payerName}  `,
                                        style: "listDetailsStyle",
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [false, false, true, false],
                            margin: [10, 5, 10, 20],
                            borderColor: ["#000000", "#000000", "#000000", "#000000"],
                            columns: [
                                [
                                    {
                                        text: `${numberWithCommas(premiumDebt as number) ?? "-"}`,
                                        style: "listDetailsStyle",
                                        alignment: "right",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
        {
            style: "listDetails",
            margin: [0, (payerName?.length ?? 0) < 55 ? -10 : -20, 0, 0],
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*"],
                widths: ["*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [true, false, true, true],
                            margin: [10, 0, 10, 5],
                            borderColor: ["#000000", "#000000", "#000000", "#000000"],
                            columns: [
                                [
                                    {
                                        text: "ยอดที่ต้องชำระ : ",

                                        style: "listDetailsStyle",
                                        alignment: "left",
                                    },
                                ],
                                [
                                    {
                                        text: `${numberWithCommas(premiumDebt as number) ?? "-"}`,

                                        style: "listDetailsStyle",
                                        alignment: "right",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
    ];
};

type CutPaperProps = {
    billPaymentData: BillPaymentResponseDtoServiceResponse | undefined;
};

const CutPaper = ({ billPaymentData }: CutPaperProps) => {
    const { payerName } = billPaymentData?.data || {};

    return [
        {
            style: "cutPaper",
            margin: [0, (payerName?.length ?? 0) < 55 ? 10 : 5, 0, 0],
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*"],
                widths: ["*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [0, 0, 10, 0],
                            borderColor: ["#000000", "#000000", "#000000", "#000000"],
                            columns: [
                                [
                                    {
                                        text: "(สำหรับลูกค้า)",
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                    {
                                        text: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -",
                                        fontSize: 6,
                                        marginTop: 2,
                                        alignment: "left",
                                        noWrap: true,
                                    },
                                    {
                                        text: "(สำหรับเจ้าหน้าที่)",
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
    ];
};

function addWordBreak(str: string) {
    // ใส่ \u200B หลัง "บาท" และ "ถ้วน" และ "ต่างๆ" หรือหลังคำที่ต้องการ
    return str.replace(/(บาท|ถ้วน|ต่างๆ)/g, "$1\n");
}

type SignatureAndEmployeeBankServiceProps = {
    billPaymentData: BillPaymentResponseDtoServiceResponse | undefined;
    encodedBankImages: {
        ktnk: string;
        ttb: string;
        kbank: string;
        ktb: string;
        scb: string;
        gsb: string;
        bbl: string;
        baac: string;
        bay: string;
    };
};

const SignatureAndEmployeeBankService = ({
    billPaymentData,
    encodedBankImages,
}: SignatureAndEmployeeBankServiceProps) => {
    const { payerName, ref1, ref2, premiumDebt, contactName } = billPaymentData?.data ?? {};
    const { ktb, ttb, kbank, scb, gsb, bbl, baac, bay, ktnk } = encodedBankImages;
    const contactNameLength = (contactName?.length ?? 0) >= 36;

    return [
        {
            style: "signatureAndEmployeeBankService",
            margin: [0, (payerName?.length ?? 0) > 55 ? -5 : 0, 0, 0],
            table: {
                margin: [0, (payerName?.length ?? 0) > 55 ? -10 : 0, 0, 0],
                heights: ["*", "*"],
                widths: [365, "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [0, 0, 0, 0],
                            borderColor: ["#000000", "#000000", "#000000", "#000000"],
                            columns: [
                                [
                                    {
                                        text: "ช่องทางการชำระเงินที่เคาน์เตอร์สาขาธนาคาร (ค่าธรรมเนียมไม่เกิน 40 บาท)",
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            margin: [0, 0, 0, 0],
                            borderColor: ["#000000", "#000000", "#000000", "#000000"],
                            columns: [
                                [
                                    {
                                        text: "Biller ID : 013555100438303",
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                    {
                                        text: "ชื่อลูกค้า :" + ` ${contactName}`,
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                    {
                                        text: "Ref. 1 No. :" + ` ${ref1}`,
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                    {
                                        text: "Ref. 2 No. :" + ` ${ref2}`,
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
        {
            style: "signatureAndEmployeeBankService",
            margin: [0, contactNameLength ? -75 : -55, 0, 0],
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*"],
                widths: ["*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [0, 5, 0, 0],
                            columns: [
                                [
                                    {
                                        text: "\uf100  " + "ธนาคารที่ให้บริการชำระบิล",
                                        width: 60,
                                        marginLeft: 20,
                                        alignment: "left",
                                    },
                                ],
                                [
                                    {
                                        image: `${ktb}`,
                                        width: 25,
                                        height: 25,
                                        margin: [-147.5, -7, 0, 0],
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
        {
            style: "signatureAndEmployeeBankService",
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*"],
                widths: ["*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [0, 0, 0, 0],
                            columns: [
                                [
                                    {
                                        text: "ช่องทางอิเล็กทรอนิกส์ Internet Mobile Banking (ค่าธรรมเนียมไม่เกิน 15 บาท)",
                                        marginTop: 2,
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
        {
            style: "signatureAndEmployeeBankService",
            margin: [0, contactNameLength ? 0 : 5, 0, contactNameLength ? 3 : 0],
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*", "*"],
                widths: [290, "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            margin: [0, 0, 0, 0],
                            columns: [
                                [
                                    {
                                        text: "\uf100  " + "ธนาคารที่ให้บริการชำระบิล",
                                        width: 60,
                                        marginLeft: 20,
                                        marginBottom: 10,
                                        alignment: "left",
                                    },
                                ],
                                {
                                    width: 25,
                                    height: 25,
                                    image: `${ktb}`,
                                    margin: [5, -7, 0, 0],
                                },
                                {
                                    width: 25,
                                    height: 25,
                                    image: `${scb}`,
                                    margin: [5, -7, 10, 0],
                                },
                                {
                                    width: 25,
                                    height: 25,
                                    image: `${kbank}`,
                                    margin: [5, -7, 0, 0],
                                },
                                {
                                    width: 15,
                                    height: 15,
                                    image: `${bbl}`,
                                    margin: [9, -4, 0, 0],
                                },
                                {
                                    width: 15,
                                    height: 15,
                                    image: `${ktnk}`,
                                    margin: [18, -4, 0, 0],
                                },
                                {
                                    width: 15,
                                    height: 15,
                                    image: `${ttb}`,
                                    margin: [28, -4, 0, 0],
                                },
                                {
                                    width: 15,
                                    height: 15,
                                    image: `${gsb}`,
                                    margin: [38, -4, 0, 0],
                                },
                                {
                                    width: 15,
                                    height: 15,
                                    image: `${baac}`,
                                    margin: [48, -4, 0, 0],
                                },
                                {
                                    width: 15,
                                    height: 15,
                                    image: `${bay}`,
                                    margin: [57, -4, 0, 0],
                                },
                            ],
                        },
                    ],
                ],
            },
        },
        {
            style: "signatureAndEmployeeBankService",
            margin: [0, (payerName?.length ?? 0) < 55 ? -5 : -10, 0, 0],
            table: {
                margin: [0, 0, 0, 0],
                heights: [15, 15, 15, 15],
                widths: [100, 130, 115, "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [
                                [
                                    {
                                        text: "รับเฉพาะเงินสดเท่านั้น",
                                        marginTop: 2,
                                        alignment: "center",
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [
                                [
                                    {
                                        text: "จำนวนเงิน(บาท)/Amount(Baht)",
                                        marginTop: 2,
                                        alignment: "center",
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [
                                [
                                    {
                                        text: `${numberWithCommas(premiumDebt as number) ?? "-"}`,
                                        marginTop: 2,
                                        marginRight: 10,
                                        alignment: "right",
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [
                                [
                                    {
                                        text: "สำหรับเจ้าหน้าที่",
                                        marginTop: 2,
                                        marginLeft: 10,
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
        {
            style: "signatureAndEmployeeBankService",
            table: {
                margin: [0, 0, 0],
                heights: [15, 15, 15],
                widths: [100, 254, "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [true, false, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [
                                [
                                    {
                                        text: "จำนวนเงินเป็นตัวอักษร",
                                        marginTop: 2,
                                        alignment: "center",
                                    },
                                    { text: "Amount in Words", fontSize: 8, alignment: "center" },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [true, false, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            stack: [
                                {
                                    text:
                                        THBtext(premiumDebt as number).length > 60
                                            ? addWordBreak(THBtext(premiumDebt as number))
                                            : THBtext(premiumDebt as number),
                                    fontSize: 8,
                                    marginTop: THBtext(premiumDebt as number).length > 60 ? 2 : 17,
                                    alignment: "center",
                                },
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [true, false, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [
                                [
                                    {
                                        text: "ลงชื่อ....................................................................",
                                        marginTop: 17,
                                        marginLeft: 10,
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
    ];
};

type OwnerBillSignatureProps = {
    billPaymentData: BillPaymentResponseDtoServiceResponse | undefined;
};

const OwnerBillSignature = ({ billPaymentData }: OwnerBillSignatureProps) => {
    const { payerName } = billPaymentData?.data || {};

    return [
        {
            style: "ownerBillSignature",
            margin: [0, (payerName?.length ?? 0) < 55 ? 10 : 3, 0, 0],
            table: {
                margin: [0, 15, 0, 0],
                heights: [15],
                widths: ["*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#dbdbdb", "#dbdbdb", "#dbdbdb", "#dbdbdb"],
                            columns: [
                                [
                                    {
                                        text: "ชื่อผู้นำฝาก / Deposit By ................................................................................",
                                        marginTop: 2,
                                        marginLeft: 10,
                                        style: "tableHeader",
                                    },
                                ],
                                [
                                    {
                                        text: "โทรศัพท์ / Telephone .......................................................................................",
                                        marginTop: 2,
                                        marginLeft: 5,
                                        style: "tableHeader",
                                    },
                                ],
                            ],
                        },
                    ],
                ],
            },
        },
    ];
};

type QRCodeAndBarcodeProps = {
    encodedQRCode: string | null;
    encodedBarcode: string | null;
};

const QRCodeAndBarcode = ({ encodedQRCode, encodedBarcode }: QRCodeAndBarcodeProps) => ({
    style: "qrCodeAndBarcode",
    table: {
        headerRows: 1,
        width: [250, "*"],
        body: [
            [
                {
                    border: [false, false, false, false],
                    columns: [
                        {
                            image: `${encodedQRCode}`,
                            width: 90,
                            alignment: "left",
                            margin: [-7.5, 2, 0, 0],
                        },
                        {
                            margin: [5, 40, 0, 0],
                            text: "ชำระได้ทุกธนาคาร",
                        },
                        {},
                    ],
                },
                {
                    border: [false, false, false, false],
                    columns: [
                        [
                            {
                                image: `${encodedBarcode}`,
                                width: 350,
                                alignment: "left",
                                margin: [-24, 25, 0, 0],
                            },
                        ],
                    ],
                },
            ],
        ],
    },
});
