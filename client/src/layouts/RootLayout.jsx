import React from 'react';
import Navbar from "../components/Navbar/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;