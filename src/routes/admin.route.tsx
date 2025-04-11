import AdminProfile from "@/pages/Deshboard/Admin/AdminProfile/AdminProfile";
import AddProduct from "@/pages/Deshboard/Admin/AddProduct/AddProduct";
import ManageProduct from "@/pages/Deshboard/Admin/ManageProduct/ManageProduct";
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
    element: <ManageProduct />
  },

];
