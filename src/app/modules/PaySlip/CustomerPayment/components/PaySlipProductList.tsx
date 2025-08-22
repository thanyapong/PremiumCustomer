import { GetPaySlipDto_Response } from "../../../../api/prmApi.Client";
import { Divider, Typography } from "@mui/material";
import PaySlipProductDetails from "./PaySlipProductDetails";

type PaySlipProductListProps = {
    payslipData?: GetPaySlipDto_Response[];
};

const PaySlipProductList = ({ payslipData }: PaySlipProductListProps) => {
    const headerTextSx = {
        fontSize: { lg: 16, xs: 14 },
        fontWeight: "bold",
    };

    return (
        <>
            <Typography sx={{ color: "#1db1e7", ...headerTextSx, mt: 2.5 }}>รายละเอียดผลิตภัณฑ์ :</Typography>
            <Divider sx={{ backgroundColor: "#1db1e7" }} />
            {payslipData?.map(
                (item: GetPaySlipDto_Response, payslipIndex: number) =>
                    item.refDebHeader?.refDebtDetail?.map((refDebtDetailItem: any, detailIndex: number) => (
                        <PaySlipProductDetails
                            key={`${payslipIndex}-${detailIndex}`}
                            productItemNo={payslipIndex}
                            refDebtDetail={refDebtDetailItem}
                        />
                    ))
            )}
        </>
    );
};

export default PaySlipProductList;
