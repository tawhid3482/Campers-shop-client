import { Outlet } from "react-router-dom";
import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../pages/Footer/Footer";

const MainLayout  = () => {
    return (
        <div className="container mx-auto px-4">
            <Navbar></Navbar>
            <div className="min-h-screen">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout ;