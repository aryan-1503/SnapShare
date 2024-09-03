import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {api} from "../../api/base.js";
import Loading from "../../components/Loading/Loading.jsx";
import {LazyLoadImage} from "react-lazy-load-image-component";
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ManageImages = () => {
    const { id } = useParams();
    const [event, setEvent] = useState([]);
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleGetAllImages = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/images/${id}`);
            setImages(res.data.images);
            setFilteredImages(res.data.images);
        } catch (error) {
            console.error('Error fetching images:', error);
            alert(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/event/${id}`);
                setEvent(res.data.event);
            } catch (e) {
                console.log(e);
            }
        };

        fetchEvent();
        handleGetAllImages();

    }, []);

    console.log(filteredImages)

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        if (category === "") {  // Handle the "All" category with an empty string
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.category === category));
        }
    };


    const handleDelete = async (imageId) => {
        try {
            const res = await axios.delete(`http://localhost:5555/api/images/delete/${id}/${imageId}`);
            setImages(prevImages => prevImages.filter(image => image._id !== imageId));
            setFilteredImages(prevFilteredImages => prevFilteredImages.filter(image => image._id !== imageId));
            toast.success(res.data.message);
            await handleGetAllImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete the image.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-yellow-50 p-4">
            <div className="pb-4 w-full text-4xl text-center font-dancing-script border-b-2 border-yellow-950">
                Manage Images
            </div>
            <div className="my-4 w-full text-center">
                <label htmlFor="category-select" className="font-semibold text-xl">Filter by Category: </label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-2 border-2 border-yellow-950 rounded bg-yellow-50 text-yellow-950"
                >
                    <option value="" className="bg-yellow-50 text-yellow-950">All</option>
                    {event.categories && event.categories.map((cat, index) => (
                        <option key={index} value={cat} className="bg-yellow-50 text-yellow-950">{cat}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                    <div className="h-[80vh] flex items-center justify-center">
                        <Loading />
                    </div>
                ) : filteredImages.length > 0 ? (
                    filteredImages.map((image, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-yellow-50 p-4 shadow-lg rounded w-full cursor-pointer"
                            onClick={() => console.log('Image clicked:', image)}
                        >
                            <LazyLoadImage
                                src={image.imageUrl}
                                alt={`Event Image ${index + 1}`}
                                className="w-[350px] h-[300px] rounded object-cover"
                                effect="blur"
                                wrapperProps={{
                                    style: {transitionDelay: "100ms"},
                                }}
                            />
                            <hr/>
                            <div className="text-xl mt-4 text-yellow-950 font-semibold border-b-2 border-yellow-950">
                                Uploaded by: {image.uploaderName}
                            </div>
                            <button
                                className="mt-2 text-xl text-red-500 hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent click event bubbling to image click
                                    handleDelete(image._id);
                                }}
                            >
                                Delete
                            </button>
                            <ToastContainer />
                        </div>
                    ))
                ) : (
                    <div className="h-[80vh] flex items-center justify-center text-2xl">No images found.</div>
                )}
            </div>
        </div>
    );
};

export default ManageImages;
