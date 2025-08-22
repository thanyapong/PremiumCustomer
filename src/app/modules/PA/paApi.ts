import axios from "axios";
import { API_PAYMENT_GW_URL, API_PRM_GW_URL } from "../../../Const";
import { PAV2Client } from "../../api/prmApi.Client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { swalError } from "../_common";
import { InquiryDto_Request, PaymentClient, PaymentDto_Request, PaymentDto_ResponseServiceResponse } from "../../api/prmchillpayApi.Client";

const paV2Client = new PAV2Client(API_PRM_GW_URL, axios);
const paymentClient = new PaymentClient(API_PAYMENT_GW_URL, axios);

const getPABillPaymentQueryKey = "getPABillPaymentQueryKey";
const getInquiryQueryKey = "getInquiryQueryKey";

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
            refetchOnWindowFocus: true,
            refetchInterval: (data) => {
                // Only poll if payment status is pending (1) or processing (2)
                const paymentStatusId = data?.data?.paymentStatusId;
                return paymentStatusId === 1 || paymentStatusId === 2 ? 10000 : false;
            },
            enabled: !!body.summaryDetailCode && body.summaryDetailCode.trim() !== "",
        }
    );
};

export const useGetInquiry = (
    body?: InquiryDto_Request | undefined
) => {
    return useQuery(
        [getInquiryQueryKey, body],
        () =>
            paymentClient.inquiry(
                body
            ),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: true,
            enabled: !!body?.orderRef && body?.orderRef.trim() !== "",
        }
    );
};

export const usePostChillPayPayment = (
    onSuccessCallback: (response: PaymentDto_ResponseServiceResponse) => void,
    onErrorCallback: (error: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation(
        (body: PaymentDto_Request) => paymentClient.payment(body),
        {
            onSuccess: (response) => {
                if (!response.isSuccess) onErrorCallback(response.message || response.exceptionMessage || "Unknown error");
                else onSuccessCallback(response);

                queryClient.invalidateQueries([getPABillPaymentQueryKey]);
                queryClient.invalidateQueries([getInquiryQueryKey]);
            },
            onError: (error: any) => {
                onErrorCallback && onErrorCallback(error);
                queryClient.invalidateQueries([getPABillPaymentQueryKey]);
                queryClient.invalidateQueries([getInquiryQueryKey]);
            },
        }
    );
};

interface GetPABillPaymentRequestDTO {
    debtHeaderId?: string | undefined,
    bill?: string | undefined,
    summaryDetailId?: string | undefined,
    summaryDetailCode?: string | undefined,
}
