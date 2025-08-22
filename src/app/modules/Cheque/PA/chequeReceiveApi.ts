import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PAV2Client } from "../../../api/prmApi.Client";
import { API_PAYMENT_GW_URL, API_PRM_GW_URL } from "../../../../Const";
import { swalError } from "../../_common";
import { ChequeSlipClient } from "../../../api/prmchqApi.Client";

const paV2Client = new PAV2Client(API_PRM_GW_URL, axios);
const chequeSlipClient = new ChequeSlipClient(API_PAYMENT_GW_URL, axios);

const getPABillPaymentQueryKey = "getPABillPaymentQueryKey";

export const useGetPABillPayment = (
    body: GetPABillPaymentRequestDTO
) => {
    return useQuery(
        [getPABillPaymentQueryKey, body.summaryDetailCode],
        () =>
            paV2Client.pAGetBillPaymentV2(
                body.debtHeaderId,
                body.bill,
                body.summaryDetailId,
                body.summaryDetailCode
            ),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: false,
            enabled: !!body.summaryDetailCode && body.summaryDetailCode.trim() !== "",
        }
    );
};

export const useGetChequeSlip = (
    refCode?: string | undefined
) => {
    return useQuery(
        [getPABillPaymentQueryKey, refCode],
        () =>
            chequeSlipClient.chequeslip(refCode),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: false,
            enabled: !!refCode && refCode.trim() !== "",
        }
    );
};

interface GetPABillPaymentRequestDTO {
    debtHeaderId?: string | undefined,
    bill?: string | undefined,
    summaryDetailId?: string | undefined,
    summaryDetailCode?: string | undefined,
}