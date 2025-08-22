import axios from "axios";
import { API_PRM_GW_URL, API_PRMORDER_GW_URL } from "../../../Const";
import { DebtDetail, PremiumV2Client } from "../../api/prmApi.Client";
import { useQuery } from "@tanstack/react-query";
import { swalError } from "../_common";
import { GetDcrDateByOrderIdDto, OrderV2Client } from "../../api/prmorderApi.Client";

const premiumV2Client = new PremiumV2Client(API_PRM_GW_URL, axios);
const premiumOrderV2Client = new OrderV2Client(API_PRMORDER_GW_URL, axios);

const getBillPaymentBySummaryDetailCodeQueryKey = "getBillPaymentBySummaryDetailCodeQueryKey";
const getDebtQueryKey = "getDebtQueryKey";
const getDcrDateByOrderIdQueryKey = "getDcrDateByOrderIdQueryKey";

export const useGetBillPaymentBySummaryDetailCode = (
    summaryDetailCode: string
) => {
    return useQuery(
        [getBillPaymentBySummaryDetailCodeQueryKey, summaryDetailCode],
        () =>
            premiumV2Client.getBillPaymentV2(
                summaryDetailCode
            ),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: true,
            refetchInterval: (data) => {
                // Only poll if payment status is pending (1) or processing (2)
                const paymentStatusId = data?.data?.paymentStatusId;
                return paymentStatusId === 1 || paymentStatusId === 2 ? 10000 : false;
            },
            enabled: !!summaryDetailCode && summaryDetailCode.trim() !== "",
        }
    );
};

export const useGetDebt = (
    body: DebtRequestDto
) => {
    return useQuery(
        [getDebtQueryKey, body],
        () =>
            premiumV2Client.getDebtV2(
                body?.debtHeaderId,
                body?.billNo
            ),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: false,
            enabled: !!body?.debtHeaderId && body?.debtHeaderId.trim() !== "",
        }
    );
};

export const useGetDcrDateByOrderId = (
    orderid: string
) => {
    return useQuery(
        [getDcrDateByOrderIdQueryKey, orderid],
        () =>
            premiumOrderV2Client.getDcrDateByOrderId(orderid),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: false,
            enabled: !!orderid && orderid.trim() !== "",
        }
    );
};


export interface DebtRequestDto {
    debtHeaderId: string;
    billNo?: string | undefined;
}

// สร้าง type สำหรับ merged product item
export type MergedProductItem = DebtDetail & {
    dcrDate?: GetDcrDateByOrderIdDto;
};