import { createBrowserRouter } from "react-router";
import MainLayout from "../Components/layout/mainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Shop from "../pages/Shop/Shop";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ProductDetails from "../pages/Shop/ProductDetails/ProductDetails";
import Cart from "@/pages/Home/Cart/Cart";
import ProtectedRoute from "@/Components/layout/ProtectedRoute";
import Checkout from "@/pages/Checkout/Checkout";

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
        element: <Register></Register>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },

      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      // protected route
      {
        path: "/products/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails></ProductDetails>
            //{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart></Cart>
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
