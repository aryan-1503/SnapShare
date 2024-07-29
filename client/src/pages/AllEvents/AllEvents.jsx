import React from 'react';
import AllEvent  from "../../assets/all-events.jpg"
const AllEvents = () => {
    return (
        <div className="bg-yellow-50 flex justify-center items-center p-16">
            <div className=" flex flex-col justify-center items-center">
                <div className="flex justify-between items-center">
                    <div>
                        <img src={AllEvent} alt="" className="w-[370px] h-[240px] object-cover rounded-lg shadow-[0_5px_15px_rgba(0, 0, 0, 0.35)] hover:scale-105 duration-200 ease-in cursor-pointer hover:shadow-2xl"/>
                    </div>
                    <div>
                        <h1 className="text-yellow-950 text-5xl">My Events</h1>
                        <p className="text-yellow-950 text-lg">All the events created by you will be visible here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllEvents;