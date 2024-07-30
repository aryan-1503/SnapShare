import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import Event from "../../assets/event.jpg";
import { IoCloudUploadOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";

const CreateEvent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleGenerateQRCode = (e) => {
        e.preventDefault();
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (categoryInput.trim() !== '') {
            setCategories([...categories, categoryInput]);
            setCategoryInput('');
        }
    };

    const handleDelete = (index) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="flex justify-around bg-yellow-50">
            <div className="w-2/5 msm:hidden mxs:hidden">
                <Link to="https://www.pexels.com/photo/gentle-lush-floribunda-flowers-on-floor-2879823/">
                    <LazyLoadImage
                        src={Event}
                        alt=""
                    />
                </Link>
            </div>
            <div className="w-3/5 flex flex-col justify-center items-center gap-8 bg-yellow-50 mxs:w-full">
                <div className="text-5xl text-yellow-950 mxs:text-center mxs:mt-8">Create your Event</div>
                <form onSubmit={handleGenerateQRCode} className="hover:shadow-2xl mxs:hover:w-[98%] duration-200 ease-in rounded-xl p-8 w-2/3 flex flex-col gap-2 justify-center items-center mxs:w-auto">
                    <input
                        type="text"
                        placeholder="Event Name"
                        className="text-lg pl-[0.6rem] bg-yellow-50 border-2 border-amber-950 p-1 w-2/3 placeholder:text-yellow-900"
                    />
                    <div
                        className="relative flex flex-col justify-center items-center w-2/3 h-48 border-2 border-dashed border-yellow-950 text-center text-gray-600 cursor-pointer"
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
                            name="text"
                            id="file"
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex gap-2 w-2/3">
                        <input
                            type="text"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            placeholder="Categories Eg. Ring Ceremony"
                            className="text-lg pl-[0.6rem] bg-yellow-50 border-2 border-amber-950 p-1 w-11/12 placeholder:text-yellow-900"
                        />
                        <button
                            onClick={handleAdd}
                            className="px-3 bg-yellow-950 text-yellow-50 rounded hover:bg-yellow-900 duration-200 ease-in active:scale-95"
                        >
                            <IoIosAdd className="text-2xl" />
                        </button>
                    </div>
                    <div className="text-yellow-950 text-2xl font-bold mt-3">
                        Event Categories
                        <ol className="overflow-y-scroll max-h-20 scrollbar scrollbar-track-yellow-50">
                            {categories.length > 0 ? categories.map((category, index) => (
                                <li key={index} className="flex items-center justify-between gap-8 text-lg font-[300] pl-2">
                                    - {category} <button onClick={() => handleDelete(index)}><MdOutlineDelete className="text-xl" /></button>
                                </li>
                            )) : (
                                <div className="font-[300] text-xl pl-2">
                                    - No items
                                </div>
                            )}
                        </ol>
                    </div>
                    <button type="submit" className="mt-4 p-2 bg-yellow-950 text-yellow-50 rounded hover:bg-yellow-900 duration-200 ease-in active:scale-95">
                        Generate QR Code
                    </button>
                </form>
                <div className="w-3/5 mb-8 mxs:w-10/12">
                    <div className="text-xl text-yellow-950"><b>Note</b> : The image upload here will be used as the display image in your event page.</div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
