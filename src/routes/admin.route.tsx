import AdminProfile from "@/pages/Deshboard/Admin/AdminProfile/AdminProfile";
import AddProduct from "@/pages/Deshboard/Admin/AddProduct/AddProduct";
import ManageProduct from "@/pages/Deshboard/Admin/ManageProduct/ManageProduct";
import UpdateProduct from "@/pages/Deshboard/Admin/ManageProduct/UpdateProduct";
import AllOrder from "@/pages/Deshboard/Admin/AllOrder/AllOrder";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard/adminProfile",
    element: <AdminProfile />,
  },
  {
    name: "Dashboard",
    path: "dashboard/addProduct",
    element: <AddProduct></AddProduct>,
  },
  {
    name: "Dashboard",
    path: "dashboard/manage",
    element: <ManageProduct />,
  },
  {
    name: "Dashboard",
    path: "dashboard/allOrder",
    element: <AllOrder />,
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard/update/:id",
    element: <UpdateProduct />,
    loader: ({ params }: { params: { id: string } }) =>
      fetch(`https://campers-shop-one.vercel.app/products/${params.id}`)
  },
  
];
