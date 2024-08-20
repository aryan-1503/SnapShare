import React from 'react';
import {Outlet} from "react-router-dom";
import EventNavbar from "../components/Navbar/EventNavbar.jsx";
import EventPageFooter from "../components/Footer/EventPageFooter.jsx";

const EventPageLayout = () => {
    return (
        <>
            <EventNavbar />
            <Outlet />
            <EventPageFooter />
        </>
    );
};

export default EventPageLayout;