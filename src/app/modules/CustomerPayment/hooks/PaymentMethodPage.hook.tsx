import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
type usePaymentMethodPageHookProps = {};

const usePaymentMethodPageHook = ({}: usePaymentMethodPageHookProps) => {
    const { summaryDetailCode } = useParams();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { windowDimensions, summaryDetailCode };
};

export default usePaymentMethodPageHook;
