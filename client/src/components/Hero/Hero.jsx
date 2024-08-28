import React, { useContext, useState } from 'react';
import Hero1 from "../../assets/hero-1.jpg";
import Hero2 from "../../assets/hero-2.jpg";
import Hero3 from "../../assets/hero-3.jpg";
import Hero4 from "../../assets/hero-4.jpg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Hero = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loadedImages, setLoadedImages] = useState({
        Hero1: false,
        Hero2: false,
        Hero3: false,
        Hero4: false,
    });

    const handleImageLoad = (imageName) => {
        setLoadedImages(prevState => ({
            ...prevState,
            [imageName]: true,
        }));
    };

    const handleGetStarted = () => {
        if (user) {
            navigate("/new-event");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="p-16 flex justify-around items-center gap-4 bg-[#f6f0d8] mxs:p-4 mxs:flex-col msm:flex-col msm:p-4 mmd:p-8 mmd:flex-col">
            <div className="flex flex-col items-center w-[55%] mxs:w-[100%] msm:w-full mmd:w-full">
                <div className="text-[55px] text-yellow-950 font-bold mxs:text-[40px]">
                    Capture and Share Memories: All Event Photos in One Place
                </div>
                <div className="text-2xl text-yellow-900 mt-4">
                    Our event photo collector platform helps you easily manage and showcase your event photo collection. Upload, organize, and share your best moments.
                </div>
                <div className="mt-8 flex gap-4 mr-8">
                    {user ? (
                        <button className="px-4 flex justify-center items-center bg-yellow-950 font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={() => navigate("/event/all")}>My events</button>
                    ) : (
                        <button className="px-4 flex justify-center items-center bg-yellow-950 font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={() => navigate("/register")}>Sign Up</button>
                    )}
                    <button className="p-2 flex justify-center items-center font-[500] text-yellow-950 text-xl border-2 border-yellow-950 hover:shadow-2xl hover:bg-yellow-950 duration-200 ease-in hover:text-[#FFFFF0] active:scale-95" onClick={handleGetStarted}>Get Started →</button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mxs:grid-cols-1 msm:grid-cols-1 msm:place-items-center">
                <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                        // If you need to, you can tweak the effect transition using the wrapper style.
                        style: {transitionDelay: "100ms"},
                    }}
                    src={Hero1}
                    alt=""
                    className={`w-[370px] h-[240px] object-cover rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.35)] hover:scale-105 duration-200 ease-in cursor-pointer hover:shadow-2xl `}
                />
                <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                        // If you need to, you can tweak the effect transition using the wrapper style.
                        style: {transitionDelay: "100ms"},
                    }}
                    src={Hero2}
                    alt=""
                    className={`w-[370px] h-[240px] rounded-lg shadow hover:shadow-2xl hover:scale-105 duration-200 ease-in cursor-pointer `}
                />
                <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                        // If you need to, you can tweak the effect transition using the wrapper style.
                        style: {transitionDelay: "100ms"},
                    }}
                    src={Hero3}
                    alt="Photo by Rene Terp: https://www.pexels.com/photo/two-women-holding-candles-1405528/"
                    className={`w-[370px] h-[240px] rounded-lg shadow object-cover hover:shadow-2xl hover:scale-105 duration-200 ease-in cursor-pointer `}
                />
                <LazyLoadImage
                    effect="blur"
                    wrapperProps={{
                        // If you need to, you can tweak the effect transition using the wrapper style.
                        style: {transitionDelay: "100ms"},
                    }}
                    src={Hero4}
                    alt="Photo by Ana Villacorta: https://www.pexels.com/photo/birthday-cake-in-close-up-shot-14849495/"
                    className={`w-[370px] h-[240px] rounded-lg object-cover shadow hover:shadow-2xl hover:scale-105 duration-200 ease-in cursor-pointer `}
                />
            </div>
        </div>
    );
};

export default Hero;
