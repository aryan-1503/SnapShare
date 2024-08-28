import React, {useEffect, useState} from 'react';
import "./Upload.css";
import { MdOutlineCameraAlt, MdOutlineFileUpload } from "react-icons/md";
import { IoImagesOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagesPreview from "../../components/ImagesPreview/ImagesPreview.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../api/base.js";

const Upload = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [loading,setLoading] =useState(false)
    // const [fetching,setFetching] = useState(false)
    const [showPreview,setShowPreview] = useState(false);
    const [ uploaderName, setUploaderName ] = useState("");
    const handleFileChange = (event) => {
        setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    };


    const handleToggle = () => {
        setShowPreview(true);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setUploaderName(value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        if(selectedFiles.length === 0) {
            toast.error("No images to upload!",{
                position: "top-center",
            })
            return
        }
        selectedFiles.forEach(file => {
            data.append('image',file)
        })
        data.append('uploaderName', uploaderName);
        try{
            setLoading(true)
            const res = await api.post(`/images/upload/${id}`,data, {
                headers : {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res.data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    return (
        <div className="upload-wrapper h-full">
            <ToastContainer />
            <div className="upload-container">
                <div className="upload-title">
                    Upload Images
                    <hr />
                </div>
                <div className="upload-inputs">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="capture-image" className="file-label">
                            <div className="take-a-photo">
                                <div>Take a Photo</div>
                                <div style={{ fontSize: "20px" }}>
                                    <MdOutlineCameraAlt />
                                </div>
                            </div>
                            <input
                                type="file"
                                capture
                                id="capture-image"
                                accept="image/*"
                                style={{ display: "none" }}
                                multiple
                                onChange={handleFileChange}
                            />
                            <hr />
                        </label>
                        <label htmlFor="upload-images" className="file-label">
                            <div className="take-a-photo">
                                <div>Choose from library</div>
                                <div style={{fontSize:"20px",marginTop:"0.1rem"}}><MdOutlineFileUpload /></div>
                            </div>
                            <input
                                type="file"
                                id="upload-images"
                                accept="image/*"
                                style={{ display: "none" }}
                                multiple
                                onChange={handleFileChange}
                            />
                            <hr />
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            id="uploader-name"
                            name="uploaderName"
                            onChange={handleChange}
                            className="font-cinzel text-lg placeholder-black placeholder:uppercase mt-1"
                        />
                        <button type="button" onClick={handleToggle} className="preview-btn">
                            <div style={{ paddingTop: "0.2rem", paddingLeft: "0.6rem", paddingRight: "0.4rem" }}>
                                <IoImagesOutline />
                            </div>
                            <div>Preview</div>
                        </button>
                        <button type="submit" className="upload-btn uppercase">
                            {loading ? "Uploading..." : "Upload Images"}
                        </button>
                    </form>
                    <div className="guidelines">
                        <div className="guideline-title">
                            Steps to Upload :
                            <hr />
                        </div>
                        <ul className="guideline uppercase flex flex-col gap-2 mb-2">
                            <li>Click <span style={{fontWeight: "bold"}}>'TAKE A PHOTO'</span> or <span style={{fontWeight: "bold"}}>'CHOOSE FROM LIBRARY'</span> to select images for upload.</li>
                            <li>Click <span style={{fontWeight: "bold"}}>'PREVIEW'</span> to view your selected images. You can remove any images if needed.</li>
                            <li>Click <span style={{fontWeight: "bold"}}>'UPLOAD IMAGES'</span> to share your moments.</li>
                            <li>See all uploaded images by clicking the button in the lower right corner.</li>
                        </ul>
                    </div>

                    <div className="preview">
                        {showPreview && <ImagesPreview images={selectedFiles} setImages={setSelectedFiles} setShowPreview={setShowPreview} />}
                    </div>
                </div>
                <div className="flex justify-center items-center p-4 w-full">
                    <button className="view-images-btn uppercase p-2 w-[80%]" onClick={() => navigate(`/event/${id}/all-images`)}>View Images →</button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
