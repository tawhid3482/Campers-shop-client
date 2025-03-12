import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/layout/mainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop/Shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <Register></Register>
      },
      {
        path: "/shop",
        element: <Shop></Shop>
      },
    ],
  },
]);

export default router;
