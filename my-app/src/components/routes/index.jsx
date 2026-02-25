import HomeAdmin from "../../dashboard/Home";
import InforCompany from "../../dashboard/inforCompany";
import ManageCV from "../../dashboard/ManageCV";
import DetailCV from "../../dashboard/ManageCV/DetailCV";
import ManageJob from "../../dashboard/ManageJob";
import CreateJob from "../../dashboard/ManageJob/CreateJob";
import CompanyDetail from "../../pages/CompanyDetail";
import Home from "../../pages/Home";
import JobDetail from "../../pages/JobDetail";
import ListJobFound from "../../pages/ListJobFound";
import Login from "../../pages/Login";
import Logout from "../../pages/Logout";
import Register from "../../pages/Register";
import PrivatePages from "../../PrivatePage";
import LayoutAdmin from "../LayoutAdmin";
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
                path: "listJobFound",
                element: <ListJobFound />
            }
        ]
    },
    {
        element: <PrivatePages />,
        children: [
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "dashboard",
                element: <LayoutAdmin />,
                children: [
                    {
                        index: true,
                        element: <HomeAdmin />
                    },
                    {
                        path: "inforCompany",
                        element: <InforCompany />
                    },
                    {
                        path: "manageCV",
                        element: <ManageCV />
                    },
                    {
                        path: "manageCV/detailCV/:id",
                        element: <DetailCV />
                    },
                    {
                        path: "manageJob",
                        element: <ManageJob />
                    },
                    {
                        path: "manageJob/createJob",
                        element: <CreateJob />
                    }
                ]
            }
        ]
    }
]