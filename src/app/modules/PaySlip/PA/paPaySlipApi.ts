import axios from "axios";
import { API_PRM_GW_URL } from "../../../../Const";
import { PAV2Client } from "../../../api/prmApi.Client";
import { useQuery } from "@tanstack/react-query";
import { swalError } from "../../_common";

const paV2Client = new PAV2Client(API_PRM_GW_URL, axios);

const getPAGetPaySlipV2QueryKey = "getPAGetPaySlipV2QueryKey";

export const useGetPAPaySlipV2BySummaryDetailCode = (body: PAPaySlipRequestDTO) => {
    return useQuery(
        [getPAGetPaySlipV2QueryKey, body.summaryDetailCode],
        () => paV2Client.pAGetPaySlipV2(body.summaryDetailId, body.summaryDetailCode),
        {
            onError: (error: Error) => {
                swalError(error.message, "");
            },
            refetchOnWindowFocus: false,
            enabled: !!body.summaryDetailCode && body.summaryDetailCode.trim() !== "",
        }
    );
};

interface PAPaySlipRequestDTO {
    summaryDetailId?: string | undefined;
    summaryDetailCode?: string | undefined;
}
