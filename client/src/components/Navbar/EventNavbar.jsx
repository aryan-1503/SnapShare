import React from 'react';
import {SiImagedotsc} from "react-icons/si";

const EventNavbar = () => {
    return (
        <div className="py-1 flex justify-center items-center gap-2 tracking-wide text-[30px] text-amber-100 bg-yellow-950">
            <SiImagedotsc className="text-2xl" />
            SnapShare
        </div>
    );
};

export default EventNavbar;