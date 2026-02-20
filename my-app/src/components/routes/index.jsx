import CompanyDetail from "../../pages/CompanyDetail";
import Home from "../../pages/Home";
import JobDetail from "../../pages/JobDetail";
import ListJobFound from "../../pages/ListJobFound";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import LayoutDetaul from "../LayoutDefault";

export const routes = [
    {
        path: "/",
        element: <LayoutDetaul />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "companyDetail/:id",
                element: <CompanyDetail />
            },
            {
                path: "jobDetail/:id",
                element: <JobDetail />
            },
            {
                path: "ListJobFound",
                element: <ListJobFound />
            }
        ]
    }
]