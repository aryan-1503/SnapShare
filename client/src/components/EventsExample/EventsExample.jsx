import React from 'react';
import Hero1 from "../../assets/hero-1.jpg"
import Hero2 from "../../assets/hero-2.jpg"
import Hero3 from "../../assets/hero-3.jpg"
import {IoMdAdd} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const EventsExample = () => {
    const navigate = useNavigate()

    return (
        <div className="flex justify-center items-center p-8 bg-[#F8EEC7FF]">
            <div className="flex justify-center flex-col items-center gap-4">
                <div className="text-[50px] font-bold text-yellow-950 mxs:text-5xl mxs:text-center">
                    Create your Event
                </div>
                <div className="text-justify w-7/12 text-xl text-yellow-900 mxs:w-full msm:w-full mmd:w-4/5 mlg:w-7/12">
                    Welcome to SnapShare! Whether it's a wedding, a birthday, or any special occasion, our platform lets you create and manage your events effortlessly. Upload your favorite photos, generate QR codes for easy sharing, and keep all your memories in one place. Get started now and make every moment memorable.
                </div>
                <div className="w-7/12 flex justify-center items-center gap-4 mt-4 mxs:flex-col msm:flex-col mmd:grid mmd:grid-cols-2 mmd:w-auto mlg:grid mlg:grid-cols-3 mlg:w-auto">
                    <div className=" p-3 w-[390px] h-[345px] hover:scale-105 duration-200 ease-in hover:shadow-lg mxs:w-[270px] mxs:h-[370px] msm:w-[300px] msm:h-[350px] mmd:h-[370px] mmd:w-[300px] mlg:w-[270px] mlg:h-[37  0px]">
                        <img src={Hero1} alt="" className="w-[300px] h-[180px] rounded"/>
                        <div className="flex justify-between items-center mt-2 mxs:flex-col">
                            <div className="text-2xl font-bold">Family Gathering</div>
                            <div className="bg-yellow-200 px-1">June 2024</div>
                        </div>
                        <div className="mt-2 text-lg">
                            Reconnect with loved ones and create lasting memories at our annual family gathering.
                        </div>
                    </div>
                    <div className=" p-3 w-[370px] h-[345px] hover:scale-105 duration-200 ease-in hover:shadow-lg mxs:w-[270px] mxs:h-[370px] msm:w-[300px] msm:h-[350px] mmd:h-[370px] mmd:w-[300px] mlg:w-[270px] mlg:h-[37  0px]">
                        <img src={Hero2} alt="" className="w-[300px] h-[180px] rounded"/>
                        <div className="flex justify-between items-center mt-2">
                            <div className="text-2xl font-bold">Uttrayan</div>
                            <div className="bg-yellow-200 px-1">Jan 2024</div>
                        </div>
                        <div className="mt-2 text-lg">
                            Celebrate the kite festival with vibrant skies and joyful moments.
                        </div>
                    </div>
                    <div className=" p-3 w-[370px] h-[345px] hover:scale-105 duration-200 ease-in hover:shadow-lg mxs:w-[270px] mxs:h-[370px] msm:w-[300px] msm:h-[350px] mmd:h-[370px] mmd:w-[300px] mlg:w-[270px] mlg:h-[37  0px]">
                        <img src={Hero3} alt="" className="w-[300px] h-[180px] rounded"/>
                        <div className="flex justify-between items-center mt-2">
                            <div className="text-2xl font-bold">Wedding</div>
                            <div className="bg-yellow-200 px-1">Dec 2023</div>
                        </div>
                        <div className="mt-2 text-lg">
                            Join us in celebrating love and unity at this beautiful wedding ceremony.
                        </div>
                    </div>
                </div>
                <button className="mt-4 p-[0.5rem_0.8rem_0.5rem_0.5rem] flex items-center gap-1 text-xl font-bold text-yellow-950 border-2 border-yellow-950 active:scale-95 hover:bg-yellow-950 duration-200 ease-in hover:text-amber-100" onClick={() => navigate("/new-event")}><IoMdAdd />Create Your Event</button>
            </div>
        </div>
    );
};

export default EventsExample;