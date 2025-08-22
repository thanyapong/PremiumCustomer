import { PaySlipResponseDtoServiceResponse } from "../../../api/prmApi.Client";
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { FONTS } from "../../../../Const";
import { formatDateString, numberWithCommas } from "../../_common/helpersFunction";
import THBtext from "thai-baht-text";

(pdfMake as any).fonts = FONTS;

type PAPaySlipPDFProps = {
    paySlipData?: PaySlipResponseDtoServiceResponse;
    encodedData: {
        encodedSiamSmileLogoImage: string;
    };
};

export const PAPaySlipPDF = ({ paySlipData, encodedData }: PAPaySlipPDFProps) => {
    const { encodedSiamSmileLogoImage } = encodedData;

    const docDefinition: TDocumentDefinitions = {
        header: HeaderPage({ encodedSiamSmileLogoImage }),
        content: [
            BillDetails({ paySlipData }) as any,
            Total({ paySlipData }) as any,
            ListDetails({ paySlipData }) as any,
            Summary({ paySlipData }) as any,
        ],
        defaultStyle: {
            font: "Sarabun",
            fontSize: 9,
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

const insertNewLines = (str?: string, width?: number) => {
    const strLength = str?.length;
    if (strLength && width && strLength > width) {
        const regex = new RegExp(`.{1,${width}}`, "g");
        const matches = str?.match(regex);
        return matches?.join("\n");
    } else {
        return str;
    }
};
const insertMarginDetails = (_str?: string, str2?: string, width?: number) => {
    const regex = new RegExp(`.{1,${width}}`, "g");
    const matchesPayerName = str2?.match(regex);
    if (matchesPayerName?.length == 1) {
        return 10;
    } else if (matchesPayerName?.length == 2) {
        return 10;
    } else if (matchesPayerName?.length == 3) {
        return 30;
    } else if (matchesPayerName?.length == 4) {
        return 50;
    } else if (matchesPayerName?.length == 5) {
        return 70;
    } else {
        return 90;
    }
};

const insertMargin = (_str?: string, str2?: string, width?: number) => {
    // const strLength = str2?.length;
    const regex = new RegExp(`.{1,${width}}`, "g");
    // const matchesAddress = str.match(regex);
    const matchesPayerName = str2?.match(regex);
    if (matchesPayerName?.length == 1) {
        return 28;
    } else if (matchesPayerName?.length == 2) {
        return 10;
    } else if (matchesPayerName?.length == 3) {
        return 12;
    } else if (matchesPayerName?.length == 4) {
        return 14;
    } else if (matchesPayerName?.length == 5) {
        return 16;
    } else {
        return 18;
    }
};

type BillDetailsProps = {
    paySlipData?: PaySlipResponseDtoServiceResponse;
};

const BillDetails = ({ paySlipData }: BillDetailsProps) => {
    const { fullAddress, payerName, applicationCode, bill, ref1, ref2 } = paySlipData?.data ?? {};

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
            style: "tableHeader",
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
                            margin: [0, 10, 0, 10],
                            columns: [
                                [
                                    { text: "รหัสแอพ  \n AppID", marginLeft: 20, alignment: "left" },
                                    {
                                        text: "ชื่อสถานศึกษา  \n Name of School",
                                        marginLeft: 20,
                                        marginTop: 10,
                                        alignment: "left",
                                    },
                                    {
                                        text: "ที่อยู่สถานศึกษา  \n School address",
                                        marginLeft: 20,
                                        marginTop: insertMarginDetails(fullAddress, payerName, 29),
                                        alignment: "left",
                                    },
                                ],
                                [
                                    {
                                        text: `${applicationCode ? applicationCode : "-"}`,
                                        alignment: "left",
                                    },
                                    {
                                        text: insertNewLines(payerName, 29),
                                        marginTop: 28,
                                        alignment: "left",
                                    },
                                    {
                                        text: `${fullAddress}`,
                                        marginTop: insertMargin(fullAddress, payerName, 29),
                                        alignment: "left",
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
                                        text: "หมายเลขบิล   \n Bill No.",
                                        marginLeft: 20,
                                        marginTop: 10,
                                        alignment: "left",
                                    },
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
                                        text: `${bill ? bill : "-"}`,
                                        marginTop: 10,
                                        alignment: "left",
                                    },
                                    { text: `${ref1}`, marginTop: 28, alignment: "left" },
                                    { text: `${ref2}`, marginTop: 28, alignment: "left" },
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
    paySlipData: PaySlipResponseDtoServiceResponse | undefined;
};

const Total = ({ paySlipData }: TotalProps) => {
    const { premiumDebt, transactionDatetime } = paySlipData?.data ?? {};

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
                                        text: `จำนวนเงิน                        ${numberWithCommas(
                                            premiumDebt as number
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

const itemToProductName = ({ data }: PaySlipResponseDtoServiceResponse) => {
    // คำนวณลำดับที่จากการสะสมจำนวนรายการใน dataArray ก่อนหน้า
    const { productName } = data ?? {};

    return `ผลิตภัณฑ์ : ประกันอุบัติเหตุนักเรียน แผน : ${productName}`;
};

type ListDetailsProps = {
    paySlipData?: PaySlipResponseDtoServiceResponse;
};

const ListDetails = ({ paySlipData }: ListDetailsProps) => {
    const { premiumDebt } = paySlipData?.data ?? {};

    // สร้าง empty rows 8 แถว
    const emptyRows = Array.from({ length: 12 }, (_, index) => {
        const isLastRow = index === 11; // แถวสุดท้าย (index 7)

        return [
            {
                style: "itemlistDetails",
                colSpan: 2,
                border: isLastRow ? [true, false, false, true] : [true, false, false, false],
                columns: [""],
                margin: [20, 5, 0, 0],
            },
            "",
            {
                style: "itemlistDetails",
                border: isLastRow ? [false, false, true, true] : [false, false, true, false],
                columns: [""],
                alignment: "right",
                margin: [20, 5, 0, 0],
            },
        ];
    });

    return {
        style: "listDetails",
        table: {
            headerRows: 1,
            widths: [240, 195, "*"],
            heights: [8, 8, 8, "*"],
            body: [
                ...HeaderListDetails(),
                [
                    {
                        style: "itemlistDetails",
                        colSpan: 2,
                        border: [true, false, false, false],
                        columns: [itemToProductName({ data: paySlipData?.data })],
                        margin: [20, 3, 0, 0],
                    },
                    "",
                    {
                        style: "itemlistDetails",
                        border: [false, false, true, false],
                        columns: [numberWithCommas(premiumDebt as number)],
                        alignment: "right",
                        margin: [20, 3, 0, 0],
                    },
                ],
                ...emptyRows, // เพิ่ม empty rows 8 แถว
            ],
        },
    };
};

function addWordBreak(str: string) {
    // ใส่ \u200B หลัง "บาท" และ "ถ้วน" และ "ต่างๆ" หรือหลังคำที่ต้องการ
    return str.replace(/(บาท|ถ้วน|ต่างๆ)/g, "$1\n");
}

type SummaryProps = {
    paySlipData?: PaySlipResponseDtoServiceResponse;
};

const Summary = ({ paySlipData }: SummaryProps) => {
    const { premiumDebt } = paySlipData?.data ?? {};

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
                            table: {
                                margin: [0, 0, 10, 0],
                                heights: ["*", "*"],
                                widths: [90, "*"],
                                body: [
                                    [
                                        {
                                            colSpan: 1,
                                            border: [false, false, false, false],
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
                                            columns: [
                                                {
                                                    text: `${
                                                        THBtext(premiumDebt as number).length > 60
                                                            ? addWordBreak(THBtext(premiumDebt as number))
                                                            : THBtext(premiumDebt as number)
                                                    }`,
                                                    fontSize: 9,
                                                    marginTop: THBtext(premiumDebt as number).length > 60 ? 0 : 8,
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
                            columns: [
                                [{ text: "รวมเป็นเงิน\n Subtotal", fontSize: 9, alignment: "center", marginTop: 2 }],
                                [
                                    {
                                        text: `      ${numberWithCommas(premiumDebt as number)}  `,
                                        fontSize: 11,
                                        alignment: "right",
                                        marginRight: 3,
                                        marginTop: 7,
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
