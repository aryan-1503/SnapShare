import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import "./EventPage.css"
import {api} from "../../api/base.js";
import AuthContext from "../../context/AuthContext.jsx";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                const res = await api.get(`/event/${id}`)
                setEvent(res.data.event)
            }catch (e) {
                console.log(e)
            }
        }

        fetchEvent()
    }, []);


    const handleShareMemories = () => {
        navigate(`/event/${event._id}/upload`)
    }


    return (
        <div className="flex flex-col justify-center items-center bg-yellow-50 gap-4 p-8">
            <div className="title text-4xl text-center text-yellow-950">
                Welcome to the {event.eventName}
            </div>
            <LazyLoadImage
                src={`https://snapshare-avzz.onrender.com/${decodeURIComponent(event.eventPhoto)}`}
                className="w-[240px] h-[270px] object-cover rounded-md shadow-2xl"
                effect="blur"
                wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: {transitionDelay: "1s"},
                }}
                alt="preview not available"
            />
            {/*<img src={`https://snapshare-avzz.onrender.com/${decodeURIComponent(event.eventPhoto)}`} alt="No preview available" className="w-[240px] h-[270px] object-cover rounded-md shadow-2xl"/>*/}
            <div className="uppercase font-cinzel font-[500] text-md text-justify xl:w-1/5">
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
