import MyOrder from "@/pages/Deshboard/User/MyOrder/MyOrder";
import PaymentHistory from "@/pages/Deshboard/User/PaymentHistory/PaymentHistory";
import Profile from "@/pages/Deshboard/User/Profile/Profile";
import Reviews from "@/pages/Deshboard/User/Reviews/Reviews";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard/profile",
    element: <Profile />,
  },
  {
    name: "Dashboard",
    path: "dashboard/myOrder",
    element: <MyOrder />,
  },
  {
    name: "Dashboard",
    path: "dashboard/payment-history",
    element: <PaymentHistory />,
  },
  {
    name: "Dashboard",
    path: "dashboard/reviews",
    element: <Reviews />,
  },
];
