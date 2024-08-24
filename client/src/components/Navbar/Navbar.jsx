import React, {useState, useEffect, useContext} from 'react';
import { SiImagedotsc } from "react-icons/si";
import {Link, useNavigate} from "react-router-dom";
// import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {FaRegUser} from "react-icons/fa";
import AuthContext from "../../context/AuthContext.jsx";
import axios from "axios";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const {user,setUser} = useContext(AuthContext);


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

    const handleLogout = async () => {
        try{
            const res = await axios.post("http://localhost:5555/api/auth/logout",{},{withCredentials :true})
            if (res.status === 200) {
                alert(res.data.message)
                setUser(null);
            }
        }catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>
            <header className="flex justify-around items-center gap-[15rem] p-2 bg-[#382014] shadow-3xl text-amber-100 mxs:gap-7 ">
                <Link to="/" className="flex justify-center items-center gap-3 tracking-wide text-[30px]">
                    <SiImagedotsc className="text-3xl" />
                    SnapShare
                </Link>
                <nav className="flex gap-5 text-[19px] flex-wrap tracking-wider items-center mxs:hidden msm:hidden">
                    {
                        user ? (
                            <>
                                <Link to="/" className="hover:underline duration-1000 ease-in active:scale-95">Home</Link>
                                <Link to="/event/all" className="hover:underline active:scale-95">My Events</Link>
                                <Link to="/profile" className="flex justify-center items-center gap-1 hover:underline active:scale-95"><FaRegUser className="text-[16px]" />Profile</Link>
                                <Link to="/" className="hover:underline active:scale-95" onClick={handleLogout}>Logout</Link>
                            </>

                        ) : (
                            <>
                                <Link to="/about-us" className="hover:underline active:scale-95">About</Link>
                                <Link to="/contact-us" className="flex justify-center items-center gap-2 hover:underline active:scale-95">Contact Us</Link>
                                <Link to="/register" className="bg-amber-100 rounded-md font-[600] text-[#2f1a1a] py-[0.2rem] px-[0.4rem] hover:bg-[#FFFFF0] hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95">SignUp</Link>
                                <Link to="/login" className="hover:underline active:scale-95">Login</Link>
                            </>

                        )
                    }

                </nav>
                <button className="flex active:scale-95 md:hidden hamburger-button" onClick={() => setIsOpen(!isOpen)}>
                    <GiHamburgerMenu className="text-3xl" />
                </button>
            </header>
            {isOpen &&
                <div className="flex justify-end m-2 absolute right-5 animate-expand-vertically">
                    <div className="p-4 flex justify-center items-center text-[24px] flex-col bg-[#f6f0d8] shadow-2xl border-2 border-amber-950 md:hidden">

                        {
                            user ? (
                                <>
                                    <Link to="/about-us" className="w-full border-b-2 border-b-amber-950 font-[500]">About</Link>
                                    <Link to="/register" className="w-full border-b-2 border-b-amber-950 font-[500]">My Events</Link>
                                    <Link to="/profile" className="w-full border-b-2 border-b-amber-950 font-[500]">Profile</Link>
                                    <Link to="/" className="w-full font-[500] font-[Dubai,serif]" onClick={handleLogout}>Logout</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/about-us" className="w-full border-b-2 border-b-amber-950 font-[500]">About</Link>
                                    <Link to="/profile" className="w-full border-b-2 border-b-amber-950 font-[500]">Contact</Link>
                                    <Link to="/register" className="w-full border-b-2 border-b-amber-950 font-[500]">SignUp</Link>
                                    <Link to="/login" className="w-full font-[500] font-[Dubai,serif]">Login</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default Navbar;
