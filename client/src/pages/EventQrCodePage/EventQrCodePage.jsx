import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import {api} from "../../api/base.js";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

const EventQrCodePage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [eventDetails, setEventDetails] = useState([]);
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const res = await api.get(`/new-event/${id}`);
                setEventDetails(res.data.event);
            } catch (e) {
                console.log(e);
            }
        };

        const generateQrCode = async () => {
            try {
                setLoading(true);
                const res = await axios.post("https://cors-anywhere.herokuapp.com/https://api.qr-code-generator.com/v1/create?access-token=e435ZYMcafFm24E63zgmNgxlqEdG8ZUsah70U_cZROULfeso-D2gPrq8za6cKKK4", {
                    "frame_name": "no-frame",
                    "qr_code_text": `http://localhost:5173/event-qr-code/${id}`,
                    "image_format": "SVG",
                    "qr_code_logo": "scan-me-square"
                });
                setQrCode(res.data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchSingleEvent();
        generateQrCode();
    }, [id]);

    return (
        <>
            {loading ?
                <Loading/> : (
                    <div className="w-screen bg-yellow-50 flex justify-evenly items-center">
                        <div className="flex justify-center items-center">
                            <Link to={`http://localhost:5173/event/${user.username}/${id}`} className="p-2">
                                <iframe src={`http://localhost:5173/event/${user.username}/${id}`} frameBorder="0" title="Preview" className="h-[90vh] w-[350px] border-2 border-yellow-950"></iframe>
                            </Link>
                        </div>
                        <div className="">
                            {qrCode && (
                                <div
                                    dangerouslySetInnerHTML={{ __html: qrCode }}
                                    className="w-full h-full"
                                />
                            )}
                        </div>
                    </div>
                )}
        </>
    );
};

export default EventQrCodePage;
