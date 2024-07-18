import React, { useState, useEffect } from 'react';
import { SiImagedotsc } from "react-icons/si";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {FaRegUser} from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.menu-content') && !event.target.closest('.hamburger-button')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <header className="flex justify-around items-center gap-[15rem] p-2 bg-[#2f1a1a] text-amber-100 mxs:gap-7 shadow-lg">
                <Link to="/" className="flex justify-center items-center gap-3 tracking-wide">
                    <SiImagedotsc className="text-3xl" />
                    SnapShare
                </Link>
                <nav className="flex gap-4 text-[19px] flex-wrap tracking-wider items-center mxs:hidden msm:hidden">
                    <Link to="/about-us" className="hover:underline active:scale-95">About</Link>
                    <Link to="/profile" className="flex justify-center items-center gap-2 hover:underline active:scale-95"><FaRegUser className="text-[20px]" /> User</Link>
                    <Link to="/register" className="bg-amber-100 rounded-md font-[600] text-[#2f1a1a] py-[0.2rem] px-[0.4rem] hover:bg-[#ccc6bd] hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95">SignUp</Link>
                    <Link to="/login" className="hover:underline active:scale-95">Login</Link>
                </nav>
                <button className="flex active:scale-95 md:hidden hamburger-button" onClick={() => setIsOpen(!isOpen)}>
                    <GiHamburgerMenu />
                </button>
            </header>
            {isOpen &&
                <div className="flex justify-end m-2 fixed right-1 menu-content">
                    <div className="p-3 flex justify-center items-center text-[24px] flex-col bg-[#FFFFF0] shadow-2xl border-2 border-amber-950 rounded-lg md:hidden">
                        <Link to="/profile" className="flex justify-center items-center gap-2 w-full border-b-2 border-b-amber-950 font-[500]"><FaRegUser className="text-xl" /> User</Link>
                        <Link to="/register" className="w-full border-b-2 border-b-amber-950 font-[500]">SignUp</Link>
                        <Link to="/login" className="w-full border-b-2 border-b-amber-950 font-[500] font-[Dubai,serif]">Login</Link>
                        <Link to="/about-us" className="w-full  font-[500]">About</Link>
                    </div>
                </div>
            }
        </>
    );
};

export default Navbar;
