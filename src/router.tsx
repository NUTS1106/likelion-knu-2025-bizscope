import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import MapPage from "./Pages/MapPage";
import ChartPage from "./Pages/ChartPage";
import App from "./App";
import NotFound from "./Pages/NotFound";
import UserDashboard from "./Pages/UserDashboard"; //추가

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "chart",
        element: <ChartPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "dashboard",          //UserDashboard 경로 추가
        element: <UserDashboard />,
      },
      {
        path: "logout",
        element: <h1>logout</h1>,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
