import React from 'react';
import {Link} from "react-router-dom";
import {SiImagedotsc} from "react-icons/si";
import {CgCopyright} from "react-icons/cg";

const Footer = () => {
    return (
        <footer className="absolute bottom-0 w-full flex justify-around items-center p-4 bg-[#2f1a1a] text-amber-100 mxs:flex-col msm:flex-col">
            <div className="flex flex-col justify-center items-center">
                <Link to="/" className="pt-2 flex justify-center items-center gap-3 tracking-wide">
                    <SiImagedotsc className="text-3xl" />
                    SnapShare
                </Link>
                <a
                    href="https://github.com/aryan-1503"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-2 flex justify-center items-center gap-1 tracking-wide text-xl"
                >
                    Copyright
                    <CgCopyright />
                    2024
                </a>
            </div>
            <div className="flex justify-around items-center gap-20 pt-4 mxs:flex-col mxs:gap-1">
                <nav className="flex flex-col gap-1 text-[19px] flex-wrap tracking-wider items-center">
                    <Link to="/about-us" className="hover:underline active:scale-95">Create Event</Link>
                    <Link to="/login" className="hover:underline active:scale-95">Your Events</Link>
                    <Link to="/login" className="hover:underline active:scale-95">Profile</Link>
                    <Link to="/login" className="hover:underline active:scale-95">Contact Us</Link>
                </nav>
                <nav className="flex flex-col gap-1 text-[19px] flex-wrap tracking-wider items-center">
                    <Link to="/about-us" className="hover:underline active:scale-95">About</Link>
                    <Link to="/login" className="hover:underline active:scale-95">Terms & Conditions</Link>
                    <Link to="/login" className="hover:underline active:scale-95">Policy</Link>
                    <Link to="/login" className="hover:underline active:scale-95">Privacy</Link>
                </nav>
            </div>

        </footer>
    );
};

export default Footer;