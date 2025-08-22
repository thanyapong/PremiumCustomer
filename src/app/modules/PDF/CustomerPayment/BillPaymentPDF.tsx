import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { APP_INFO, FONTS } from "../../../../Const";
import { GetBillPaymentDto_ResponseServiceResponse, GetDebtDto_Response } from "../../../api/prmApi.Client";
import { numberWithCommas } from "../../_common/helpersFunction";
import THBtext from "thai-baht-text";
import { signature } from "./Image";
import { CaPDF } from "./customerPaymentPDFApi";
import { swalError, swalInfo } from "../../_common";

(pdfMake as any).fonts = FONTS;

type BillPaymentPDFProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_Response[];
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
        encodeBPBackgroundImage: string;
        encodedQRCode: string | null;
        encodedBarcode: string | null;
    }; // Replace with actual type
};

export const BillPaymentPDF = ({ billPaymentData, debtData, encodedData }: BillPaymentPDFProps) => {
    const { mode } = APP_INFO;
    const { billNo } = billPaymentData?.data?.debtHeader ?? {};
    const { debtDetails } = debtData?.[0] ?? {};
    const { encodeBPBackgroundImage, encodedSiamSmileLogoImage, encodedQRCode, encodedBarcode, encodedBankImages } =
        encodedData ?? {};

    const debtDetailsCount = debtDetails?.length ?? 0;
    const data = debtDetails;

    const firstRowCount = 29;
    const rowLimit = 44;
    const isCheck = debtDetailsCount > firstRowCount;
    const dataArray: any[] = [];

    if (isCheck) {
        // ดึงกลุ่มแรก firstRowCount รายการ
        dataArray[0] = data?.slice(0, firstRowCount);

        // คำนวณจำนวนรายการที่เหลือ
        const exceed = debtDetailsCount - firstRowCount;
        if (exceed > 0) {
            const pageCount = Math.floor(exceed / rowLimit);
            const remain = exceed % rowLimit;

            // วนลูปเพื่อดึงกลุ่มละ rowLimit รายการ
            for (let i = 0; i < pageCount; i++) {
                dataArray[i + 1] = data?.slice(firstRowCount + i * rowLimit, firstRowCount + (i + 1) * rowLimit);
            }

            // ดึงกลุ่มสุดท้ายที่มีจำนวนรายการน้อยกว่า rowLimit ถ้ามีเหลือ
            if (remain > 0) {
                dataArray[pageCount + 1] = data?.slice(
                    firstRowCount + pageCount * rowLimit,
                    firstRowCount + pageCount * rowLimit + remain
                );
            }
        }
    } else {
        // ถ้าไม่ตรวจสอบใส่รายการทั้งหมดใน array index 0
        dataArray[0] = data;
    }

    const docDefinition: TDocumentDefinitions = {
        background: function (_currentPage, _pageSize) {
            return { image: `${encodeBPBackgroundImage}`, width: 600 };
        },
        content: [
            HeaderPage({
                billPaymentData,
                debtData,
                encodedSiamSmileLogoImage,
                encodedQRCode,
                encodedBarcode,
            }) as any,
            Total({ debtData }) as any,
            ...dataArray.map((v, index) =>
                ListDetails({
                    debtData,
                    detailData: v,
                    lastPage: index === dataArray.length - 1,
                    dataArrayIndex: index,
                    dataArray,
                })
            ),
            CutPaper(),
            SignatureAndEmployeeBankService({
                billPaymentData,
                debtData,
                encodedBankImages,
            }),
            OwnerBillSignature(),
            QRCodeAndBarcode({
                encodedQRCode,
                encodedBarcode,
            }),
        ],
        footer: function (currentPage, pageCount) {
            return {
                margin: [15, 0, 10, 0],
                columns: [
                    {
                        alignment: "left",
                        text: [
                            { text: currentPage.toString(), italics: true },
                            "/",
                            { text: pageCount.toString(), italics: true },
                        ],
                    },
                ],
            };
        },
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [15, 5, 15, 20],
        styles: {
            header: {
                margin: [0, 5, 0, 7],
            },
            total: {
                margin: [0, 5, 0, 7],
            },
            listDetails: {
                margin: [0, 5, 0, 7],
            },
            itemlistDetails: {
                fontSize: 8,
            },
            cutPaperCustomer: {
                fontSize: 6,
                margin: [-5, -10, -5, -3],
            },
            cutPaper: {
                fontSize: 6,
                margin: [-5, -16, -5, 0],
            },
            signatureAndEmployeeBankService: {},
            billingInfo: {
                bold: true,
                fontSize: 13,
                color: "black",
            },
            paymentDetails: {
                margin: [0, 5, 0, 7],
            },
            ownerBillSignature: {
                margin: [0, 5, 0, 7],
            },
        },
        defaultStyle: {
            font: "Sarabun",
            fontSize: 10,
        },
    };

    if (mode === "UAT" || mode === "PROD") {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBase64((data) => {
            let CaData = {
                PdfFileBase64: data,
                RefNo: billNo,
                FileName: "BillPayment",
                ImgFileBase64: signature,
            };
            CaPDF(CaData)
                .then((res) => {
                    console.log(res);
                    if (res.isSuccess === true) {
                        window.open(`${res.data.data}`, "_self");
                    } else {
                        swalInfo("", res.message);
                    }
                })
                .catch((err) => {
                    swalError("", err);
                });
        });
    } else {
        pdfMake.createPdf(docDefinition).open();
    }
};

type HeaderPageProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_Response[];
    encodedSiamSmileLogoImage: string;
    encodedQRCode: string | null;
    encodedBarcode: string | null;
};

const HeaderPage = (props: HeaderPageProps) => {
    const { billPaymentData, debtData, encodedSiamSmileLogoImage, encodedQRCode, encodedBarcode } = props;
    const { payerName } = debtData?.[0] ?? {};
    const { debtHeader } = billPaymentData?.data ?? {};
    const { ref1 } = debtHeader ?? {};

    return [
        {
            style: "header",
            table: {
                headerRows: 1,
                widths: [250, "*"],
                body: [
                    [
                        {
                            border: [false, false, false, false],
                            margin: [-5, 0, 0, 0],
                            columns: [
                                {
                                    //image:`${encodeAllImg[8]}`,
                                    image: `${encodedSiamSmileLogoImage}`,
                                    //
                                    //text:"",
                                    width: 80,
                                    alignment: "left",
                                },
                            ],
                        },
                        {
                            border: [false, false, false, false],

                            columns: [
                                [
                                    {
                                        text: "บ.สยามสไมล์โบรกเกอร์ (ประเทศไทย) จำกัด",
                                        alignment: "right",
                                    },

                                    {
                                        text: "เลขที่ 89/6-10 ชั้น 4,5 ถนนเฉลิมพงษ์",
                                        alignment: "right",
                                    },
                                    {
                                        text: "แขวงสายไหม เขตสายไหม กรุงเทพ 10220",
                                        alignment: "right",
                                    },
                                    {
                                        text: "Call Center 1434 หรือติดต่อ 02-533-3999",
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
            margin: [0, -10, 0, 0],
            table: {
                headerRows: 1,

                widths: [214, "*"],
                body: [
                    [
                        {
                            border: [false, false, false, false],
                            columns: [
                                [
                                    {
                                        text: `เรียน คุณ ${payerName}`,
                                    },
                                    {
                                        text: `Reference : ${ref1}`,
                                    },
                                ],
                            ],
                        },
                        {
                            border: [false, false, false, false],
                            columns: [
                                [
                                    {
                                        text: "ใบแจ้งชำระเบี้ย",
                                        alignment: "center",
                                        bold: true,
                                    },
                                    {
                                        text: "(Bill Payment Pay-In-Slip)",
                                        alignment: "center",
                                        bold: true,
                                    },
                                ],
                            ],
                            fillColor: "#DBDBDB",
                        },
                    ],
                ],
            },
        },
        {
            table: {
                headerRows: 1,
                widths: [250, "*"],
                body: [
                    [
                        {
                            border: [false, false, false, false],
                            columns: [
                                [
                                    {
                                        image: `${encodedQRCode}`,
                                        width: 57,
                                        alignment: "left",
                                        margin: [-6, -2, 0, 0],
                                    },
                                ],
                            ],
                        },
                        {
                            border: [false, false, false, false],
                            columns: [
                                [
                                    {
                                        image: `${encodedBarcode}`,
                                        width: 340,
                                        alignment: "left",
                                        margin: [-40, 0, 0, 0],
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

type TotalProps = {
    debtData?: GetDebtDto_Response[];
};

const Total = ({ debtData }: TotalProps) => {
    const { debtDetails, premiumDebt } = debtData?.[0] ?? {};
    const { applicationCode } = debtDetails?.[0] ?? {};

    return {
        style: "total",
        table: {
            headerRows: 1,
            widths: [250, "*"],
            body: [
                [
                    {
                        columns: [
                            {
                                width: "auto",
                                text: "ยอดที่ต้องชำระ : ",
                                bold: true,
                            },
                            {
                                width: "*",
                                text: `${numberWithCommas(premiumDebt as number)}`,
                                alignment: "center",
                            },
                            {
                                width: 50,
                                text: "บาท",
                                bold: true,
                                alignment: "right",
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                width: "auto",
                                text: `${applicationCode === null ? "" : applicationCode}`,
                                bold: true,
                            },
                            {
                                width: "*",
                                text: `${applicationCode === null ? "" : applicationCode}`,
                                alignment: "center",
                            },
                        ],
                    },
                ],
            ],
        },
    };
};

type itemToProductNameProps = {
    productItem: any;
    index: number;
    dataArrayIndex: number;
    dataArray: any[];
};

const itemToProductName = ({ productItem, index, dataArrayIndex, dataArray }: itemToProductNameProps) => {
    // คำนวณลำดับที่จากการสะสมจำนวนรายการใน dataArray ก่อนหน้า
    const { applicationCode, productGroupName, custName, detail1, productName } = productItem ?? {};

    // คำนวณลำดับที่ต่อเนื่องจากทุกหน้าก่อนหน้า
    let offset = 0;
    for (let i = 0; i < dataArrayIndex; i++) {
        offset += dataArray[i]?.length || 0;
    }

    const hasApplicationCode = applicationCode ? true : false;
    const isCarInsurance = productGroupName === "ประกันรถยนต์";
    return (
        ` ${offset + index + 1}. เบี้ย ${productGroupName} ผู้เอาประกันภัย : ${custName} แผน ${productName}` +
        (hasApplicationCode ? ` AppID : ${applicationCode}` : "") +
        (isCarInsurance ? ` เลขทะเบียน : ${detail1}` : "")
    );
};

interface DebtDetailItem {
    applicationCode?: string;
    productGroupName?: string;
    custName?: string;
    detail1?: string;
    productName?: string;
    totalAmount: number;
}

interface TableRowCell {
    style?: string;
    colSpan?: number;
    border?: boolean[];
    columns?: string[];
    alignment?: string;
    margin?: number[];
}

type ListDetailsProps = {
    debtData?: GetDebtDto_Response[];
    detailData: any;
    lastPage: boolean;
    dataArrayIndex: number;
    dataArray: any[];
};

const ListDetails = ({ debtData, detailData, lastPage, dataArrayIndex, dataArray }: ListDetailsProps) => {
    type TableRow = [TableRowCell, string, TableRowCell];

    const { premiumDebt } = debtData?.[0] ?? {};

    const render: TableRow[] = detailData.map((item: DebtDetailItem, index: number): TableRow => {
        const isLastRowOfPage = index === detailData.length - 1 && !lastPage; // row สุดท้ายของหน้า แต่ไม่ใช่หน้าสุดท้าย

        return [
            {
                style: "itemlistDetails",
                colSpan: 2,
                border: isLastRowOfPage ? [true, false, false, true] : [true, false, false, false],
                columns: [itemToProductName({ productItem: item, index, dataArrayIndex, dataArray })],
                margin: index === 0 ? [0, 0, 0, 0] : [0, -5, 0, 0], // รายการที่ 2+ ขยับขึ้นมา
            },
            "",
            {
                style: "itemlistDetails",
                border: isLastRowOfPage ? [false, false, true, true] : [false, false, true, false],
                columns: [numberWithCommas(item.totalAmount)],
                alignment: "right",
                margin: index === 0 ? [0, 0, 0, 0] : [0, -5, 0, 0], // รายการที่ 2+ ขยับขึ้นมา
            },
        ];
    });

    const totalAmountRender: TableRow = [
        {
            style: "itemlistDetails",
            colSpan: 2,
            border: [true, false, false, true],
            columns: ["ยอดที่ต้องชำระ"],
            bold: true,
            alignment: "left",
        } as TableRowCell,
        "",
        {
            style: "itemlistDetails",
            border: [false, false, true, true],
            columns: [`${numberWithCommas(premiumDebt as number)}`],
            alignment: "right",
            bold: true,
        } as TableRowCell,
    ];

    // Empty row สำหรับเว้นช่องว่าง
    const createEmptyRow = (): TableRow => [
        {
            style: "itemlistDetails",
            colSpan: 2,
            border: [true, false, false, false],
            columns: [" "],
            alignment: "left",
        } as TableRowCell,
        "",
        {
            style: "itemlistDetails",
            border: [false, false, true, false],
            columns: [" "],
            alignment: "right",
        } as TableRowCell,
    ];

    const body = [
        [
            {
                colSpan: 2,
                border: [true, true, false, false],
                columns: [
                    {
                        text: "รายการ",
                        alignment: "center",
                    },
                ],
                fillColor: "#DBDBDB",
                columnGap: 20,
                alignment: "center",
            },
            "",
            {
                border: [false, true, true, false],
                columns: [
                    {
                        width: "*",
                        text: "จำนวนเงิน (บาท)",
                        alignment: "right",
                    },
                ],
                columnGap: 2,
                fillColor: "#DBDBDB",
            },
        ],
        [
            {
                colSpan: 2,
                border: [true, false, false, false],
                columns: [
                    {
                        text: "(Description)",
                        alignment: "center",
                    },
                ],
                fillColor: "#DBDBDB",
                columnGap: 20,
                alignment: "center",
            },
            "",
            {
                border: [false, false, true, false],
                columns: [
                    {
                        width: "*",
                        text: "Amount (Baht)",
                        alignment: "right",
                    },
                ],
                columnGap: 2,
                fillColor: "#DBDBDB",
            },
        ],
        ...render,
    ];

    if (lastPage) {
        // คำนวณจำนวน empty rows ที่ต้องเพิ่ม
        const currentDataRows = detailData.length;
        const minRows = 8; // minimum data rows ก่อน total
        const emptyRowsNeeded = Math.max(0, minRows - currentDataRows);

        // เพิ่ม empty rows ตามที่คำนวณได้
        for (let i = 0; i < emptyRowsNeeded; i++) {
            body.push(createEmptyRow());
        }

        // เพิ่ม total row สุดท้าย
        body.push(totalAmountRender);
    }

    const handlePageBreak = () => {
        if (dataArray.length == 1) {
            if (detailData.length > 10) return "after";
        } else {
            if (!lastPage) return "after";
            // ถ้าเป็นหน้าสุดท้ายและมีมากกว่า 25 รายการ ให้ขึ้นหน้าใหม่
            if (lastPage && detailData.length > 25) return "after";
        }

        return undefined;
    };

    return {
        style: "listDetails",
        table: {
            headerRows: 1,
            widths: [250, "*", "*"],
            heights: [8, 8, 8, "*"],
            body: body,
        },
        pageBreak: handlePageBreak(),
    };
};

const CutPaper = () => [
    {
        columns: [
            {
                style: "cutPaperCustomer",
                text: "\n(สำหรับลูกค้า)",
            },
        ],
    },
    {
        columns: [
            {
                style: "cutPaper",
                text: "\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
            },
        ],
    },
    {
        columns: [
            {
                style: "cutPaper",
                text: "\n(สำหรับเจ้าหน้าที่)",
            },
        ],
    },
];

type SignatureAndEmployeeBankServiceProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_Response[];
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
    debtData,
    encodedBankImages,
}: SignatureAndEmployeeBankServiceProps) => {
    const { payerName, ref1, ref2 } = billPaymentData?.data?.debtHeader ?? {};
    const { premiumDebt } = debtData?.[0] ?? {};
    const { ktb, ttb, kbank, scb, gsb, bbl, baac, bay, ktnk } = encodedBankImages;

    return [
        {
            style: "signatureAndEmployeeBankService",
            margin: [-5, 0, 0, 0],
            table: {
                margin: [0, 0, 0, 0],
                heights: ["*", "*"],
                widths: [400, "*"],
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
                                        text: "ช่องทางการชำระเงินที่เคาน์เตอร์สาขาธนาคาร (ค่าธรรมเนียมไม่เกิน 20 บาท)",
                                        marginTop: 2,
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
                                        text: "Biller ID : 013555100438301",
                                        fontSize: 8,
                                        marginTop: 2,
                                        style: "billingInfo",
                                        alignment: "left",
                                    },
                                    {
                                        text: "ชื่อลูกค้า :" + ` ${payerName}`,
                                        fontSize: 8,
                                        marginTop: 2,
                                        style: "billingInfo",
                                        alignment: "left",
                                    },
                                    {
                                        text: "Ref. 1 No. :" + ` ${ref1}`,
                                        fontSize: 8,
                                        marginTop: 2,
                                        style: "billingInfo",
                                        alignment: "left",
                                    },
                                    {
                                        text: "Ref. 2 No. :" + ` ${ref2}`,
                                        fontSize: 8,
                                        marginTop: 2,
                                        style: "billingInfo",
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
            margin: [15, -50, 0, 0],
            columns: [
                {
                    width: 25,
                    text: "\uf046  ",
                },
                {
                    width: 200,
                    text: "ธนาคารที่ให้บริการชำระบิล",
                },
                {
                    width: 24,
                    height: 24,
                    image: `${ktb}`,
                    margin: [-80, -1.5, 0, 0],
                },
            ],
        },
        { text: "ช่องทางอิเล็กทรอนิกส์ ATM, Internet Mobile Banking (ค่าธรรมเนียมไม่เกิน 5 บาท)" },
        {
            margin: [15, 5, 0, 0],
            columns: [
                {
                    width: 25,
                    text: "\uf046  ",
                },
                {
                    width: 200,
                    text: "ธนาคารที่ให้บริการชำระบิล",
                },
                {
                    width: 25,
                    image: `${ktb}`,
                    margin: [-80, -1.5, 0, 0],
                },
                {
                    width: 25,
                    image: `${scb}`,
                    margin: [-80, -1.5, 10, 0],
                },
                {
                    width: 25,
                    image: `${kbank}`,
                    margin: [-80, -1.5, 0, 0],
                },
                {
                    width: 15,
                    image: `${bbl}`,
                    margin: [-76, 1.5, 0, 0],
                },
                {
                    width: 15,
                    image: `${ktnk}`,
                    margin: [-67, 1.5, 0, 0],
                },
                {
                    width: 15,
                    image: `${ttb}`,
                    margin: [-57, 1.5, 0, 0],
                },
                {
                    width: 15,
                    image: `${gsb}`,
                    margin: [-47, 1.5, 0, 0],
                },
                {
                    width: 15,
                    image: `${baac}`,
                    margin: [-37, 1.5, 0, 0],
                },
                {
                    width: 15,
                    image: `${bay}`,
                    margin: [-28, 1.5, 0, 0],
                },
            ],
        },
        {
            style: "paymentDetails",
            table: {
                headerRows: 1,
                widths: [118, 160, 50, 200], //colspan 4  (1  1 1 1)
                body: [
                    [
                        //colspan1
                        {
                            columns: [
                                {
                                    text: "รับเฉพาะเงินสดเท่านั้น",
                                    alignment: "left",
                                },
                            ],
                        },
                        //colspan2
                        {
                            columns: [
                                {
                                    text: "จำนวนเงิน(บาท) / Amount(Baht)",
                                    alignment: "left",
                                },
                            ],
                        },
                        //colspan1
                        {
                            columns: [
                                {
                                    text: `${numberWithCommas(premiumDebt as number)}`,
                                    alignment: "right",
                                },
                            ],
                        },
                        //colspan1
                        {
                            columns: [
                                {
                                    text: "สำหรับเจ้าหน้าที่",
                                    alignment: "left",
                                },
                            ],
                        },
                    ],
                    [
                        //colspan1
                        {
                            columns: [
                                [
                                    {
                                        text: "จำนวนเงินเป็นตัวอักษร",
                                        style: [{ alignment: "center" }],
                                        width: 200, // Nothing changes..
                                    },
                                    {
                                        columns: [
                                            {
                                                text: "Amount in words",
                                                width: "*",
                                                style: [{ alignment: "center" }],
                                            },
                                        ],
                                    },
                                ],
                            ],
                        },
                        //colspan2
                        {
                            marginTop: 3,
                            colSpan: 2,
                            columns: [
                                {
                                    text: `${THBtext(premiumDebt as number)}`,
                                    style: [{ bold: true, alignment: "center", fontSize: 8 }],
                                    width: 200, // Nothing changes..
                                },
                            ],
                        },
                        //colspan1
                        {
                            columns: [
                                {
                                    text: `${premiumDebt}`,
                                    alignment: "right",
                                },
                            ],
                        },
                        //colspan1
                        {
                            text: "\nลงชื่อ........................................................................",
                        },
                    ],
                ],
            },
        },
    ];
};

const OwnerBillSignature = () => ({
    style: "ownerBillSignature",
    table: {
        headerRows: 1,
        width: ["*"],
        body: [
            [
                {
                    text: "ชื่อผู้นำฝาก / Deposit By.............................................................................................  โทรศัพท์ / Telephone................................................",
                },
            ],
        ],
    },
});

type QRCodeAndBarcodeProps = {
    encodedQRCode: string | null;
    encodedBarcode: string | null;
};

const QRCodeAndBarcode = ({ encodedQRCode, encodedBarcode }: QRCodeAndBarcodeProps) => ({
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
                            width: 57,
                            alignment: "left",
                            margin: [-6.5, -3, 0, 0],
                        },
                        {
                            margin: [5, 15, 0, 0],
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
                                margin: [-16.9, -1, 0, 0],
                            },
                        ],
                    ],
                },
            ],
        ],
    },
});
