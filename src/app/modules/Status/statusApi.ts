import axios from "axios";
import { API_PRM_GW_URL } from "../../../Const";
import { PremiumV2Client } from "../../api/prmApi.Client";
import { useQuery } from "@tanstack/react-query";
import { swalError } from "../_common";

const premiumV2Client = new PremiumV2Client(API_PRM_GW_URL, axios);

const getPaySlipBySummaryDetailCodeQueryKey = "getPaySlipBySummaryDetailCodeQueryKey";

export const useGetPaySlipBySummaryDetailCode = (
    summaryDetailCode: string
) => {
    return useQuery(
        [getPaySlipBySummaryDetailCodeQueryKey, summaryDetailCode],
        () =>
            premiumV2Client.getPaySlipV2(
                summaryDetailCode
            ),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: false,
            enabled: !!summaryDetailCode && summaryDetailCode.trim() !== "",
        }
    );
};