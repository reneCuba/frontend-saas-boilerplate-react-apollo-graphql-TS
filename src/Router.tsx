import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/layouts/errors/ErrorPage";
import PageLoader from "./components/ui/loaders/PageLoader";
import AdminRoot from "./routes/AdminRoot";
import SuperAdminRoot from "./routes/SuperAdminRoot";
import AdminDashboardPage from "./components/pages/adminPages/AdminDashboardPage";
import AdminSettingPage from "./components/pages/adminPages/AdminSettingPage";
import ForbiddenPage from "./components/layouts/errors/ForbiddenPage";
import LandingRoot from "./routes/LandingRoot";
import SuperAdminBillingPage from "./components/pages/superAdminPages/SuperAdminBillingPage";
import SuperAdminSettingPage from "./components/pages/superAdminPages/SuperAdminSettingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingRoot />, //Landing Root if have frontend app in this project
    errorElement: <ErrorPage />,
    loader: PageLoader,
    children: [
      {
        path: "/403",
        element: <ForbiddenPage />,
      },
      {
        path: "/about/:id",
        element: <div>about</div>,
      },
    ],
  },
  {
    path: "/home",
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    loader: PageLoader,
    children: [
      {
        path: "/home/dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "/home/settings",
        element: <AdminSettingPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <SuperAdminRoot />,
    errorElement: <ErrorPage />,
    loader: PageLoader,
    children: [
      {
        path: "/admin/clients",
        element: <div>profile</div>,
      },
      {
        path: "/admin/billing",
        element: <SuperAdminBillingPage />,
      },
      {
        path: "/admin/settings",
        element: <SuperAdminSettingPage />,
      },
    ],
  },
]);
