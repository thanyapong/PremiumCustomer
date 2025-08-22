import { ContentBox } from "../../_common/commonDesign";
import {
    GetBillPaymentDto_ResponseServiceResponse,
    GetDebtDto_ResponseListServiceResponse,
    DebtDetail, // เพิ่ม import สำหรับ DebtDetail type
} from "../../../api/prmApi.Client";
import {
    GetDcrDateByOrderIdDtoListServiceResponse,
    GetDcrDateByOrderIdDto, // เพิ่ม import สำหรับ DCR type
} from "../../../api/prmorderApi.Client";
import ProductDetails from "./ProductDetails";
import { MergedProductItem } from "../customerPaymentApi";
import { memo, useMemo } from "react";

type ProductListProps = {
    billPaymentData?: GetBillPaymentDto_ResponseServiceResponse;
    debtData?: GetDebtDto_ResponseListServiceResponse;
    dcrDateData?: GetDcrDateByOrderIdDtoListServiceResponse;
};

const ProductList = ({ debtData, dcrDateData }: ProductListProps) => {
    const { debtDetails } = debtData?.data?.[0] ?? {};

    // Memoize expensive computation of merging data
    const mergedDebtDetails: MergedProductItem[] = useMemo(
        () =>
            debtDetails?.map((productItem: DebtDetail) => {
                const matchedDcr: GetDcrDateByOrderIdDto | undefined = dcrDateData?.data?.find(
                    (d) => d.inCode === productItem.in
                );
                return {
                    ...productItem,
                    dcrDate: matchedDcr,
                };
            }) || [],
        [debtDetails, dcrDateData?.data]
    );

    return (
        <>
            {mergedDebtDetails.map((productItem: MergedProductItem, index: number) => (
                <ContentBox
                    key={productItem.in || index} // Use unique key instead of index
                    sx={{ mt: index > 0 ? 2 : 0, boxShadow: 2, borderRadius: 2 }}
                    children={<ProductDetails productItem={productItem} index={index} />}
                />
            ))}
        </>
    );
};

export default memo(ProductList);
