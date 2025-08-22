import { useParams } from "react-router-dom";
import { useGetPaySlipBySummaryDetailCode } from "../statusApi";
import { decodeBase64 } from "../../_common/helpersFunction";

const useThankyouHook = () => {
    const { summaryDetailCode } = useParams();
    const { data, isLoading, error } = useGetPaySlipBySummaryDetailCode(decodeBase64(summaryDetailCode || ""));

    return { data, isLoading, error, summaryDetailCode };
};

export default useThankyouHook;
