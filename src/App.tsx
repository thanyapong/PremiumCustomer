import { useQueryClient } from "@tanstack/react-query";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./app/layout/Layout";
import { NoticePage } from "./app/modules/_auth";
import Home from "./app/pages/Home";
import { RouteMapType, createRouteObject } from "./app/routes";
import Routes from "./app/routes/Routes";

function App() {
    const queryClient = useQueryClient();

    const CombineRouteConfig: RouteMapType[] = [
        {
            path: "/",
            element: <Layout />,
            title: "หน้าแรก",
            children: [
                // { index: true, title: "Redirect", element: <Navigate to="/cp" replace /> },
                // { path: "/cp", title: "สรุปยอดการชำระ", element: <CustomerBillPayment /> },
                { index: true, path: "/", title: "หน้าแรก", element: <Home />, icon: "home" },
                {
                    path: "/unauthorized",
                    title: "Unauthorized",
                    element: <NoticePage title="401 Unautorized" body="คุณไม่มีสิทธ์ เข้าถึงหน้านี้" />,
                },
                {
                    path: "/not-found",
                    title: "Not Found",
                    element: <NoticePage title="404 Not Found" body="ไม่พบเพจที่คุณต้องการ" />,
                },
                ...Routes,
            ],
        },
        {
            path: "*",
            title: "Not Found",
            element: <Navigate to="/not-found" />,
        },
    ];
    const routeObjects = CombineRouteConfig.map((route) => createRouteObject(route, queryClient));

    const router = createBrowserRouter(routeObjects, {
        basename: "/",
    });

    return <RouterProvider router={router} />;
}

export default App;

