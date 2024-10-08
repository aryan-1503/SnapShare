import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import {api} from "../../api/base.js";
import Loading from "../../components/Loading/Loading.jsx";
import { FiExternalLink } from "react-icons/fi";
import { GoDownload } from "react-icons/go";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventQrCodePage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [eventDetails, setEventDetails] = useState([]);
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const res = await api.get(`/event/${id}`);
                setEventDetails(res.data.event);
            } catch (e) {
                console.log(e);
            }
        };

        const generateQrCode = async () => {
            try {
                setLoading(true);
                const res = await api.post("/event/generate-qr-code", {
                    "frame_name": "no-frame",
                    "qr_code_text": `https://snap-share-xi.vercel.app/event/${id}`,
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

    const handleCopyURL = () => {
        const urlToCopy = `https://snap-share-xi.vercel.app/event/${id}`;
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
                alert("URL copied")
            })
            .catch(err => {
                alert("Failed to copy URL")
                console.error(err)
            })
    }

    const handleDownloadQrCode = () => {
        if (!qrCode) return;

        // Create an off-screen canvas
        const canvas = document.createElement('canvas');
        const img = new Image();
        const svgData = new Blob([qrCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgData);

        img.onload = () => {
            // Set canvas dimensions to match the QR code
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convert canvas to JPEG and trigger download
            canvas.toBlob((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `QRCode_${eventDetails.eventName}.jpeg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }, 'image/jpeg');

            URL.revokeObjectURL(url);
        };

        img.src = url;
    }

    const handleDeleteEvent = async () => {
        // TODO: ensure more security by adding model for deleting the event
        try{
            const res = await api.delete(`/event/delete-event/${id}`,{
                withCredentials: "true"
            })
            toast.success(res.data.message,{
                position: "top-center"
            });
            navigate("/event/all");
        }catch (e){
            console.log(e)
        }
    }

    return (
        <>
            {loading ?
                <div className="bg-yellow-50 h-screen flex justify-center items-center">
                    <Loading/>
                </div> : (
                    <div className="w-screen bg-yellow-50 flex lg:justify-evenly items-center mxs:flex-col">
                        <ToastContainer />
                        <div className="flex justify-center items-center ">
                            <Link to={`https://snap-share-xi.vercel.app/event/${id}`} className="p-2 mxs:hidden">
                                <iframe src={`https://snap-share-xi.vercel.app/event/${id}`} frameBorder="0" title="Preview" className="h-[90vh] w-[350px] border-2 border-yellow-950"></iframe>
                            </Link>
                            <div className="font-dancing-script uppercase text-center text-3xl font-bold mxs:p-4 lg:hidden">
                                {eventDetails.eventName}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center items-center mxs:p-8">
                            {qrCode && (
                                <div
                                    dangerouslySetInnerHTML={{ __html: qrCode }}
                                    className="w-[350px] h-full mxs:w-[250px] border-2 border-yellow-950"
                                />

                            )}
                            {/*<img src={`https://api.qrserver.com/v1/create-qr-code/?data=https://snap-share-xi.vercel.app/event/${user.username}/${id}&amp;size=100x100`} alt="opps" className="w-[350px]"/>*/}
                            <div className="grid gap-2 grid-cols-2 place-items-center mt-4 mxs:grid-cols-1">
                                <button className="w-[9rem] p-2 flex gap-2 justify-center items-center bg-yellow-950 rounded-md font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={() => {navigate(`/event/${id}`)}}>Open Link <FiExternalLink className="mb-1" /></button>
                                <button className="w-[9rem] p-2 flex justify-center items-center bg-yellow-950 rounded-md font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={handleCopyURL}>Copy URL</button>
                                <button className="w-[9rem] p-2 flex gap-2 justify-center items-center bg-yellow-950 rounded-md font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={handleDownloadQrCode}>QR Code <GoDownload className="mb-1" /></button>
                                <button className="w-[9rem] p-2 flex justify-center items-center bg-yellow-950 rounded-md font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={() => navigate(`/edit-event/${id}`)}>Edit Event</button>
                                <button className="w-[9rem] p-2 flex justify-center items-center bg-yellow-950 rounded-md font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={() => navigate(`/event/${id}/manage-images`)}>Manage Images</button>
                                <button className="w-[9rem] p-2 flex justify-center items-center bg-yellow-950 rounded-md font-[500] text-[18px] text-[#FFFFF0] hover:bg-yellow-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95" onClick={handleDeleteEvent}>Delete event</button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default EventQrCodePage;


