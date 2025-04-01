import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/layout/mainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop/Shop";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ProductDetails from "../pages/Shop/ProductDetails/ProductDetails";

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
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
      
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
    ],
  },
]);

export default router;
