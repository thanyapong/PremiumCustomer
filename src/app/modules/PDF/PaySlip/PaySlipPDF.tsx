import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { FONTS } from "../../../../Const";
import { DebtDetail_GetPaySlip, GetPaySlipDto_Response } from "../../../api/prmApi.Client";
import { formatDateString, numberWithCommas } from "../../_common/helpersFunction";
import THBtext from "thai-baht-text";

(pdfMake as any).fonts = FONTS;

type PaySlipPDFProps = {
    payslipData?: GetPaySlipDto_Response[];
    encodedData: {
        encodedSiamSmileLogoImage: string;
    }; // Replace with actual type
};

export const PaySlipPDF = ({ payslipData, encodedData }: PaySlipPDFProps) => {
    const { encodedSiamSmileLogoImage } = encodedData ?? {};

    const refDebtDetailsCount = payslipData?.length ?? 0;
    const data = payslipData;

    const firstRowCount = 13;
    const rowLimit = 20;
    const isCheck = refDebtDetailsCount > firstRowCount;
    const dataArray: any[] = [];

    if (isCheck) {
        // ดึงกลุ่มแรก firstRowCount รายการ
        dataArray[0] = data?.slice(0, firstRowCount);

        // คำนวณจำนวนรายการที่เหลือ
        const exceed = refDebtDetailsCount - firstRowCount;
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
        header: HeaderPage({ encodedSiamSmileLogoImage }),
        content: [
            BillDetails({ paySlipData: payslipData ?? [] }) as any,
            Total({ paySlipData: payslipData ?? [] }),
            // HeaderListDetails(),
            ...dataArray.map((v, index) =>
                ListDetails({
                    paySlipData: v ?? [],
                    lastPage: index === dataArray.length - 1,
                    dataArrayIndex: index,
                    dataArray,
                })
            ),
            Summary({ paySlipData: payslipData ?? [] }),
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
        defaultStyle: {
            font: "Sarabun",
            fontSize: 10,
            bold: true,
        },
        styles: {
            header: {
                fontSize: 9,
                margin: [5, 0, 0, 0],
            },
            billDetails: {
                fontSize: 9,
            },
            total: {
                fontSize: 9,
            },
            listDetails: { marginTop: 15, fontSize: 9 },
        },
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [20, 100, 20, 65],
    };

    pdfMake.createPdf(docDefinition).open();
};

type HeaderPageProps = {
    encodedSiamSmileLogoImage: string;
};

const HeaderPage = ({ encodedSiamSmileLogoImage }: HeaderPageProps) => [
    {
        style: "header",
        table: {
            heights: [90, 80, 80],
            widths: [90, "*", "*"],
            body: [
                [
                    {
                        colSpan: 1,
                        border: [false, false, false, false],
                        columns: [
                            {
                                image: `${encodedSiamSmileLogoImage}`,
                                width: 80,
                                margin: [5, 10, 0, 0],
                            },
                        ],
                    },
                    {
                        colSpan: 1,
                        border: [false, false, false, false],
                        columns: [
                            {
                                margin: [0, 20, 0, 0],
                                alignment: "left",
                                text: "SIAM SMILE BROKER (THAILAND) COMPANY LIMITED\n ทะเบียน 0135551004383",
                            },
                        ],
                    },
                    {
                        colSpan: 1,
                        border: [false, false, false, false],
                        columns: [
                            {
                                margin: [30, 20, 16, 0],
                                alignment: "right",
                                text: "บ.สยามสไมล์โบรกเกอร์(ประเทศไทย) จำกัด\n เลขที่ 89/6-10 ชั้น 4,5 ถนนเฉลิมพงษ์\nแขวงสายไหม เขตสายไหม กรุงเทพ 10220\nCall Center 1434 หรือติดต่อ 02-533-3999",
                            },
                        ],
                    },
                ],
            ],
        },
    },
];

type BillDetailsProps = {
    paySlipData: GetPaySlipDto_Response[];
};

const BillDetails = ({ paySlipData }: BillDetailsProps) => {
    const { b, payerName, ref1, ref2 } = paySlipData?.[0]?.refDebHeader ?? {};

    return [
        {
            columns: [
                {
                    text: "ใบรับฝากเงิน",
                    fontSize: 16,
                    margin: [0, 15, 0, 10],
                    alignment: "center",
                },
            ],
        },
        {
            style: "billDetails",
            table: {
                margin: [0, 0, 10, 0],
                heights: ["*", "*"],
                widths: ["*", "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            widths: [120],
                            margin: [0, 0, 0, 10],
                            border: [true, true, true, true],
                            borderColor: ["#545453", "#545453", "#545453", "#545453"],
                            columns: [
                                [
                                    {
                                        text: "หมายเลขบิล   \n Bill No.",

                                        marginLeft: 20,
                                        marginTop: 10,
                                        alignment: "left",
                                    },
                                    {
                                        text: "ผู้ชำระเบี้ย  \n Payer Name",

                                        marginLeft: 20,
                                        marginTop: 10,
                                        alignment: "left",
                                    },
                                ],
                                [
                                    {
                                        text: `${b ? b : "-"}`,

                                        marginTop: 20,
                                        alignment: "left",
                                    },
                                    {
                                        text: `${payerName ? payerName : "-"}`,

                                        marginTop: 25,
                                        alignment: "left",
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            margin: [0, 0, 0, 10],
                            border: [true, true, true, true],
                            borderColor: ["#545453", "#545453", "#545453", "#545453"],
                            columns: [
                                [
                                    {
                                        text: "หมายเลขอ้างอิง  \n (Ref.1)",
                                        marginLeft: 20,
                                        marginTop: 10,
                                        alignment: "left",
                                    },
                                    {
                                        text: "หมายเลขอ้างอิง  \n (Ref.2)",
                                        marginLeft: 20,
                                        marginTop: 10,
                                        alignment: "left",
                                    },
                                ],
                                [
                                    {
                                        text: `${ref1 ?? "-"}`,

                                        marginTop: 20,
                                        alignment: "left",
                                    },
                                    {
                                        text: `${ref2 ?? "-"}`,

                                        marginTop: 28,
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

type TotalProps = {
    paySlipData: GetPaySlipDto_Response[];
};

const Total = ({ paySlipData }: TotalProps) => {
    const { totalAmount, refDebHeader } = paySlipData?.[0] ?? {};
    const { transactionDatetime } = refDebHeader ?? {};

    return [
        {
            style: "total",
            margin: [0, 15, 0, 0],
            table: {
                margin: [0, 0, 10, 0],
                heights: ["*", "*"],
                widths: ["*", "*"],
                body: [
                    [
                        {
                            colSpan: 1,
                            widths: [120],
                            border: [true, true, true, true],
                            borderColor: ["#545453", "#545453", "#545453", "#545453"],
                            columns: [
                                [
                                    {
                                        text: `จำนวนเงิน                         ${numberWithCommas(
                                            totalAmount as number
                                        )}            บาท`,
                                        marginLeft: 20,
                                    },
                                ],
                            ],
                        },
                        {
                            colSpan: 1,
                            border: [true, true, true, true],
                            borderColor: ["#545453", "#545453", "#545453", "#545453"],
                            columns: [
                                [
                                    {
                                        text:
                                            `วันที่ทำรายการ                   ${
                                                transactionDatetime
                                                    ? formatDateString(
                                                          transactionDatetime as any,
                                                          "DD MMM BBBB , HH:mm"
                                                      )
                                                    : "-"
                                            } ` + " น.",
                                        marginLeft: 20,
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

const HeaderListDetails = () => [
    [
        {
            colSpan: 2,
            border: [true, true, false, false],
            fillColor: "#c9f0ff",
            columnGap: 20,
            alignment: "center",
            borderColor: ["#545453", "#545453", "#545453", "#545453"],
            columns: [
                {
                    text: "รายการ",
                    alignment: "center",
                },
            ],
        },
        "",
        {
            border: [false, true, true, false],
            borderColor: ["#545453", "#545453", "#545453", "#545453"],
            columns: [
                {
                    width: "*",
                    text: "จำนวนเงิน (บาท)",
                    alignment: "right",
                },
            ],
            columnGap: 2,
            fillColor: "#c9f0ff",
        },
    ],
    [
        {
            colSpan: 2,
            border: [true, false, false, false],
            borderColor: ["#545453", "#545453", "#545453", "#545453"],
            columns: [
                {
                    text: "(Description)",
                    alignment: "center",
                },
            ],
            fillColor: "#c9f0ff",
            columnGap: 20,
            alignment: "center",
        },
        "",
        {
            border: [false, false, true, false],
            borderColor: ["#545453", "#545453", "#545453", "#545453"],
            columns: [
                {
                    width: "*",
                    text: "Amount (Baht)",
                    alignment: "right",
                },
            ],
            columnGap: 2,
            fillColor: "#c9f0ff",
        },
    ],
];

type itemToProductNameProps = {
    productItem?: DebtDetail_GetPaySlip;
    index: number;
    dataArrayIndex: number;
    dataArray: any[];
};

const itemToProductName = ({ productItem }: itemToProductNameProps) => {
    // คำนวณลำดับที่จากการสะสมจำนวนรายการใน dataArray ก่อนหน้า
    const { productGroupName, custName, detail1, productName, periodType } = productItem ?? {};

    const isCarInsurance = productGroupName === "ประกันรถยนต์";

    return `ผลิตภัณฑ์ : ${productGroupName} แผน : ${productName} ประเภทการชำระ : ${periodType?.periodTypeName} ชื่อผู้เอาประกัน : ${custName} ${
        isCarInsurance ? `เลขทะเบียน : ${detail1}` : ""
    }`;
};

interface TableRowCell {
    style?: string;
    colSpan?: number;
    border?: boolean[];
    columns?: string[];
    alignment?: string;
    margin?: number[];
}

type ListDetailsProps = {
    paySlipData: GetPaySlipDto_Response[];
    lastPage: boolean;
    dataArrayIndex: number;
    dataArray: any[];
};

const ListDetails = ({ paySlipData, lastPage, dataArrayIndex, dataArray }: ListDetailsProps) => {
    type TableRow = [TableRowCell, string, TableRowCell];

    const render: TableRow[] = paySlipData?.map((item: GetPaySlipDto_Response, index: number): TableRow => {
        const isLastRowOfPage = index === paySlipData.length - 1; // row สุดท้ายของหน้า

        return [
            {
                style: "itemlistDetails",
                colSpan: 2,
                border: isLastRowOfPage ? [true, false, false, true] : [true, false, false, false],
                columns: [
                    itemToProductName({
                        productItem: item.refDebHeader?.refDebtDetail?.[0],
                        index,
                        dataArrayIndex,
                        dataArray,
                    }),
                ],
                margin: index === 0 ? [20, 1, 0, 0] : [20, 0, 0, 0], // รายการที่ 2+ ขยับขึ้นมา
            },
            "",
            {
                style: "itemlistDetails",
                border: isLastRowOfPage ? [false, false, true, true] : [false, false, true, false],
                columns: [numberWithCommas(item.refDebHeader?.refDebtDetail?.[0]?.premiumSum as number)],
                alignment: "right",
                margin: index === 0 ? [20, 1, 0, 0] : [20, 0, 0, 0], // รายการที่ 2+ ขยับขึ้นมา
            },
        ];
    });

    const body = [...HeaderListDetails(), ...render];

    const handlePageBreak = () => {
        // ใช้ค่าคงที่ที่กำหนดไว้ในการแบ่งหน้า
        const firstRowCount = 13;
        const rowLimit = 20;

        if (dataArray.length == 1) {
            // หน้าเดียว: ถ้ามีมากกว่า firstRowCount รายการ ให้ขึ้นหน้าใหม่
            if (paySlipData.length > firstRowCount) return "after";
        } else {
            if (!lastPage) return "after";
            // ถ้าเป็นหน้าสุดท้ายและมีมากกว่า rowLimit รายการ ให้ขึ้นหน้าใหม่
            if (lastPage && paySlipData.length > rowLimit) return "after";
        }

        return undefined;
    };

    return {
        style: "listDetails",
        table: {
            headerRows: 1,
            widths: [240, 195, "*"],
            heights: [8, 8, 8, "*"],
            body: body,
        },
        pageBreak: handlePageBreak(),
    };
};

type SummaryProps = {
    paySlipData: GetPaySlipDto_Response[];
};

const Summary = ({ paySlipData }: SummaryProps) => {
    const { premiumDebt } = paySlipData[0]?.refDebHeader ?? {};

    return [
        {
            style: "tableHeader",
            margin: [0, 10, 0, 0],
            table: {
                margin: [0, 0, 10, 0],
                heights: ["*", "*"],
                widths: ["*", 200],
                body: [
                    [
                        {
                            border: [false, false, false, false],
                            borderColor: ["#fff", "#fff", "#fff", "#fff"],
                            table: {
                                margin: [0, 0, 10, 0],
                                heights: ["*", "*"],
                                widths: [90, "*"],
                                body: [
                                    [
                                        {
                                            colSpan: 1,
                                            border: [false, false, false, false],
                                            borderColor: ["#fff", "#fff", "#fff", "#fff"],
                                            columns: [
                                                {
                                                    text: `จำนวนเงิน   \n Amount  `,
                                                    fontSize: 9,
                                                    alignment: "left",
                                                    marginLeft: 15,
                                                },
                                            ],
                                        },
                                        {
                                            colSpan: 1,
                                            border: [false, false, false, false],
                                            borderColor: ["#fff", "#fff", "#fff", "#fff"],
                                            columns: [
                                                {
                                                    text: `${THBtext(premiumDebt as number)}`,
                                                    fontSize: 9,
                                                    marginTop: 9,
                                                    alignment: "left",
                                                },
                                            ],
                                        },
                                    ],
                                ],
                            },
                        },
                        {
                            colSpan: 1,
                            border: [false, false, false, false],
                            borderColor: ["#545453", "#545453", "#545453", "#545453"],
                            columns: [
                                [{ text: "รวมเป็นเงิน\n Subtotal", fontSize: 9, alignment: "center", marginTop: 2 }],
                                [
                                    {
                                        text: `      ${numberWithCommas(premiumDebt as number)}  `,
                                        fontSize: 11,
                                        alignment: "right",
                                        marginRight: 3,
                                        marginTop: 8,
                                        background: "#1db0e6",
                                        color: "#fff",
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
