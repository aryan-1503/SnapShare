import React, {useEffect, useState} from 'react';
import AllEvent  from "../../assets/all-events.jpg"
import {api} from "../../api/base.js";
import Loading from "../../components/Loading/Loading.jsx";
import Hero2 from "../../assets/hero-2.jpg";
import {Link} from "react-router-dom";
const AllEvents = () => {
    const [loading, setLoading] = useState()
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const res =await api.get("/user/events");
                console.log(res.data)
                setEvents(res.data)
            }catch (error){
                console.log("Internal Server Error")
            }finally {
                setLoading(false)
            }
        }
        fetchEvents();
    }, []);
    return (
        <div className="bg-yellow-50 flex justify-center items-center p-16 mxs:p-8">
            <div className=" flex flex-col justify-center items-center">
                <div className="flex justify-between items-center gap-20">
                    <div className="mxs:hidden msm:hidden">
                        <img src={AllEvent} alt="" className="w-[370px] h-[240px] object-cover rounded-lg shadow-[0_5px_15px_rgba(0, 0, 0, 0.35)] hover:scale-105 duration-200 ease-in cursor-pointer hover:shadow-2xl"/>
                    </div>
                    <div>
                        <div>
                            <h1 className="text-yellow-950 text-5xl mxs:text-4xl">My Events</h1>
                            <p className="text-yellow-950 text-lg mt-2 mxs:text-[15px]">All the events created by you will be visible here.</p>
                        </div>
                        <form className="max-w-md mx-auto mt-4">
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm bg-yellow-50 text-gray-900 border border-yellow-950 rounded-md focus:ring-yellow-950 focus:border-yellow-950 placeholder:text-yellow-800 mxs:w-[100%]" placeholder="Search Event" required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-yellow-950 hover:bg-yellow-900 duration-200 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-12 mxs:grid-cols-1 msm:grid-cols-1 mmd:grid-cols-2 place-items-center">
                    {loading ? <Loading /> : (
                        <>
                            {events && events.map((event,index) => (
                                <Link key={index} to={`http://localhost:5173/event-qr-code/${event._id}`} className="p-3 w-[290px] h-[370px] hover:scale-105 duration-200 ease-in hover:shadow-2xl mxs:w-[250px] mxs:h-[390px] mxs:shadow-2xl msm:w-[270px] msm:h-[350px] mmd:h-[370px] mmd:w-[300px] mlg:w-[270px] mlg:h-[37  0px]">
                                    <img src={`https://snapshare-avzz.onrender.com/${decodeURIComponent(event.eventPhoto)}`} alt="" className="w-[270px] h-[240px] rounded"/>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="text-2xl font-bold">{event.eventName}</div>
                                        <div className="bg-yellow-200 px-1">{event.eventTime ? event.eventTime : "NA"}</div>
                                    </div>
                                    <div className="mt-2 text-lg">
                                        {event.description}
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllEvents;