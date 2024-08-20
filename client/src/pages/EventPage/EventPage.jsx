import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import "./EventPage.css"
import {api} from "../../api/base.js";
import AuthContext from "../../context/AuthContext.jsx";

function EventPage() {
    const navigate = useNavigate();
    const [event,setEvent] = useState([]);
    const { user } = useContext(AuthContext)
    const handleBtn = () => {
        navigate("/upload");
    };

    const { id } = useParams()


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/new-event/${id}`)
                setEvent(res.data.event)
            }catch (e) {
                console.log(e)
            }
        }

        fetchEvent()
    }, []);

    useEffect(() => {
        console.log("Event : ",event)
    }, [event]);

    const handleShareMemories = () => {
        navigate(`/event/${user.username}/${event._id}/upload`)
    }


    return (
        <div className="container box-border w-screen flex flex-col justify-center items-center bg-yellow-50 gap-4 p-8">
            <div className="title text-4xl text-center text-yellow-950">
                Welcome to the {event.eventName}
            </div>
            <img src={`http://localhost:5555/${decodeURIComponent(event.eventPhoto)}`} alt="No preview available" className="w-[330px] h-[270px] object-cover rounded-md shadow-2xl"/>
            <div className="uppercase font-cinzel font-[500] text-md text-justify">
                Share your memories effortlessly. Upload and view wedding
                photos from all guests in one place. Make every moment
                unforgettable.
            </div>
            <button onClick={handleShareMemories} className="p-[0.5rem] font-cinzel bg-yellow-950 border border-[#faddb3] rounded-md shadow-2xl text-yellow-50 text-[16px] active:scale-95">
                SHARE MEMORIES
            </button>
        </div>
    );
}

export default EventPage;
