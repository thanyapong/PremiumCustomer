import ChequeReceivePage from "../modules/Cheque/PA/pages/ChequeReceivePage";
import BillPaymentPage from "../modules/CustomerPayment/pages/BillPaymentPage";
import CustomerBillPayment from "../modules/CustomerPayment/pages/CustomerPaymentPage";
import PaymentMethodPage from "../modules/CustomerPayment/pages/PaymentMethodPage";
import PABillPaymentPage from "../modules/PA/pages/PABillPaymentPage";
import PAPage from "../modules/PA/pages/PAPage";
import PAPaymentMethodPage from "../modules/PA/pages/PAPaymentMethodPage";
import PaySlipPage from "../modules/PaySlip/CustomerPayment/pages/PaySlipPage";
import PAPaySlipPage from "../modules/PaySlip/PA/pages/PAPaySlipPage";
import BillCancelled from "../modules/Status/pages/BillCancelled";
import Cancel from "../modules/Status/pages/Cancel";
import Error from "../modules/Status/pages/Error";
import Fail from "../modules/Status/pages/Fail";
import Loading from "../modules/Status/pages/Loading";
import Pending from "../modules/Status/pages/Pending";
import Thankyou from "../modules/Status/pages/Thankyou";
import Timeout from "../modules/Status/pages/Timeout";
import BlankPage from "../pages/BlankPage";
import Home from "../pages/Home";
import { RouteMapType } from "./AuthRoutes";

/**
 * Config ของ route ของ Project
 *
 * รูปแบบของ Config นี้ จะมี ดังนี้
 * ```
 * {
 *         path: string,            // ที่อยู่ของ path url ที่จะใช้
 *        title: string,            // ชื่อของหน้าที่จะใช้แสดง
 *      element: JSX.Element,       // หน้าที่จะใช้แสดง
 *    children?: RouteMapType[],    // ถ้ามี children จะเป็นการกำหนด route ของหน้านั้นๆ
 *       index?: boolean,           // ถ้าเป็น true ต้ว Element จะเป็นหน้าแรกที่จะแสดง
 * permissions?: string[],          // กำหนด permission ที่จะใช้เข้าถึงหน้านี้ได้
 *   condition?: "AND" | "OR",      // กำหนดว่า permission เป็นการ AND หรือ OR
 * }
 * ```
 */

const Routes: RouteMapType[] = [
    {
        path: "/blank-page",
        title: "Blank Page",
        element: <BlankPage body="Blank Page" />,
    },
    {
        path: "/test-permission",
        title: "Test Page",
        element: <BlankPage body="Test Permission" />,
    },
    // { Customer Payment }
    {
        path: "/cp",
        title: "หน้าแรก",
        element: <Home />,
    },
    {
        path: "/cp/:summaryDetailCode",
        title: "สรุปยอดการชำระ",
        element: <CustomerBillPayment />,
    },
    {
        path: "/pm/:summaryDetailCode",
        title: "เลือกวิธีการชำระ",
        element: <PaymentMethodPage />,
    },
    {
        path: "/bp/:summaryDetailCode",
        title: "ชำระเงิน",
        element: <BillPaymentPage />,
    },
    // { PA }
    {
        path: "/pa/:summaryDetailCode",
        title: "PA",
        element: <PAPage />,
    },
    {
        path: "/papm/:summaryDetailCode",
        title: "เลือกวิธีการชำระ",
        element: <PAPaymentMethodPage />,
    },
    {
        path: "/pabp/:summaryDetailCode",
        title: "ชำระเงิน",
        element: <PABillPaymentPage />,
    },
    {
        path: "/cr/:summaryDetailCode",
        title: "ใบรับฝากเช็ค",
        element: <ChequeReceivePage />,
    },
    // { Pay Slip }
    {
        path: "/ps/:summaryDetailCode",
        title: "ใบรับฝากเงิน",
        element: <PaySlipPage />,
    },
    {
        path: "/pa-ps/:summaryDetailCode",
        title: "ใบรับฝากเงิน",
        element: <PAPaySlipPage />,
    },
    // { Status }
    {
        path: "/loading",
        title: "Loading",
        element: <Loading />,
    },
    {
        path: "/er/:summaryDetailCode",
        title: "Error",
        element: <Error />,
    },
    {
        path: "/bc/:summaryDetailCode",
        title: "ยกเลิกบิล",
        element: <BillCancelled />,
    },
    {
        path: "/fail/:summaryDetailCode",
        title: "ชำระเงินไม่สำเร็จ",
        element: <Fail />,
    },
    {
        path: "/cc/:summaryDetailCode",
        title: "ยกเลิก",
        element: <Cancel />,
    },
    {
        path: "/to/:summaryDetailCode",
        title: "หมดเวลา",
        element: <Timeout />,
    },
    {
        path: "/ty/:summaryDetailCode",
        title: "ขอบคุณ",
        element: <Thankyou />,
    },
    {
        path: "/pd/:summaryDetailCode",
        title: "กำลังดำเนินการ",
        element: <Pending />,
    },
];

export default Routes;

