import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Event from "../../assets/event.jpg";
import { IoCloudUploadOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import {api} from "../../api/base.js";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        eventName: "",
        eventPhoto: selectedImage,
        eventTime: "",
        description: "",
    });

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFormData({
                ...formData,
                eventPhoto: file
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'eventTime') {
            const date = new Date(value);
            const formattedDate = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
            setFormData({
                ...formData,
                [name]: formattedDate,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleGenerateQRCode = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('eventName', formData.eventName);
        data.append('eventPhoto', formData.eventPhoto);
        data.append('eventTime', formData.eventTime);
        data.append('description', formData.description);
        categories.forEach((category) => {
            data.append('categories[]', category);
        });

        try {
            const res = await api.post("/event/create", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(res.data);
            alert(res.data.message);
            // navigate("/")
        } catch (error) {
            console.log("Server Error : ", error);
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (categoryInput.trim() !== '') {
            const updatedCategories = [...categories, categoryInput];
            setCategories(updatedCategories);
            setCategoryInput('');
        }
    };

    const handleDelete = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFormData({
                ...formData,
                eventPhoto: file
            });
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setFormData({
            ...formData,
            eventPhoto: null
        });
    };

    return (
        <div className="flex flex-col lg:flex-row justify-around bg-yellow-50">
            <div className="w-ful lg:w-2/5 hidden lg:block">
                <Link to="https://www.pexels.com/photo/gentle-lush-floribunda-flowers-on-floor-2879823/">
                    <LazyLoadImage
                        src={Event}
                        alt="Event"
                        className="lg:h-[100%] object-cover"
                    />
                </Link>
            </div>
            <div className="w-full lg:w-3/5 flex flex-col justify-center items-center bg-yellow-50">
                <div className="text-5xl text-yellow-950 mt-7 mxs:text-center mxs:mt-8">Create your Event</div>
                <form onSubmit={handleGenerateQRCode} className="bg-yellow-50 hover:shadow-2xl duration-200 ease-in rounded-xl p-8 w-full lg:w-2/3 flex flex-col gap-3 justify-center items-center">
                    <input
                        type="text"
                        placeholder="Event Name"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        className="text-lg pl-2 bg-yellow-50 border-2 border-amber-950 p-1 w-[90%] placeholder:text-yellow-800"
                    />
                    <div
                        className="relative flex flex-col justify-center items-center w-[90%] h-48 border-2 border-dashed border-yellow-950 text-center text-gray-600 cursor-pointer"
                        onClick={handleFileClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {selectedImage ? (
                            <div className="relative w-full h-full">
                                <div className="w-full h-full">
                                    <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain" />
                                </div>
                                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                                    <button onClick={handleRemoveImage} className="text-white text-xl">Remove image</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <IoCloudUploadOutline className="text-[45px] text-yellow-950" />
                                <p className="w-2/3 text-yellow-950">drag and drop your <b>event display photo</b> here or click to select an image!</p>
                            </>
                        )}
                        <input
                            className="hidden"
                            name="file"
                            id="file"
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <label htmlFor="eventDate" className="text-xl text-yellow-900 border-2 border-yellow-950 p-1 w-[90%]">
                        Event Time:
                        <input
                            type="month"
                            name="eventTime"
                            id="eventDate"
                            className="bg-yellow-50 pl-3 w-[90%]"
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="2"
                        className="bg-yellow-50 border-2 border-yellow-950 pl-2 pt-1 placeholder:text-yellow-800 text-lg w-[90%]"
                        placeholder="Describe your event"
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <div className="flex gap-2 w-[90%]">
                        <input
                            type="text"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            placeholder="Categories Eg. Ring Ceremony"
                            className="text-lg pl-2 bg-yellow-50 border-2 border-amber-950 p-1 w-11/12 placeholder:text-yellow-800"
                        />
                        <button
                            onClick={handleAdd}
                            className="px-3 bg-yellow-950 text-yellow-50 rounded hover:bg-yellow-900 duration-200 ease-in active:scale-95"
                        >
                            <IoIosAdd className="text-2xl" />
                        </button>
                    </div>
                    <div className="text-yellow-950 text-2xl font-bold w-[90%]">
                        Event Categories
                        <ol className="overflow-y-scroll max-h-20 scrollbar scrollbar-track-yellow-50">
                            {categories.length > 0 ? categories.map((category, index) => (
                                <li key={index} className="flex items-center justify-between gap-8 text-lg font-light pl-2">
                                    - {category} <button onClick={() => handleDelete(index)}><MdOutlineDelete className="text-xl" /></button>
                                </li>
                            )) : (
                                <div className="font-light text-xl pl-2">
                                    - No items
                                </div>
                            )}
                        </ol>
                    </div>
                    <button type="submit" className="mt-4 p-2 bg-yellow-950 text-yellow-50 rounded hover:bg-yellow-900 duration-200 ease-in active:scale-95">
                        Generate QR Code
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
