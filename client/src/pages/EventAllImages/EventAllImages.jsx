import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/base.js';
import Loading from "../../components/Loading/Loading.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const EventAllImages = () => {
    const { id } = useParams();
    const [event, setEvent] = useState([]);
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/event/${id}`);
                setEvent(res.data.event);
            } catch (e) {
                console.log(e);
            }
        };

        const handleGetAllImages = async () => {
            try {
                setLoading(true);
                const res = await api.get(`images/${id}`);
                setImages(res.data.images);
                setFilteredImages(res.data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
                alert(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
        handleGetAllImages();
    }, [id]);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        if (category === '') {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.category === category));
        }
    };

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.click();
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() === "") {
            setFilteredImages(images);
        } else {
            // Filter images based on the search input
            const filterImages = filteredImages.filter(image => {
                const eventName = image.uploaderName ? image.uploaderName.toLowerCase() : '';
                return eventName.includes(searchInput.toLowerCase())
            });
            setFilteredImages(filterImages);
        }

    }

    const searchChange = (e) => {
        setSearchInput(e.target.value);
    };
    return (
        <div className="flex flex-col justify-center items-center bg-yellow-50 p-4">
            <div className="pb-4 w-full text-4xl text-center font-dancing-script border-b-2 border-yellow-950">
                All Images
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
                <div className="">
                    <form onSubmit={handleSearch} className="w-1/5 mx-auto mt-4">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="search"
                                onChange={searchChange}
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm bg-yellow-50 text-gray-900 border border-yellow-950 rounded-md focus:ring-yellow-950 focus:border-yellow-950 placeholder:text-yellow-800 mxs:w-[100%]"
                                placeholder="Search by Uploader"
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-yellow-950 hover:bg-yellow-900 duration-200 font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
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
                            onClick={() => handleImageClick(image)}
                        >
                            <LazyLoadImage
                                src={image.imageUrl}
                                alt={`Event Image ${index + 1}`}
                                className="w-[350px] h-[300px] rounded object-cover"
                                effect="blur"
                                wrapperProps={{
                                    style: {transitionDelay: "1s"},
                                }}
                            />
                            <hr/>
                            <div className="text-xl mt-4 text-yellow-950 font-semibold border-b-2 border-yellow-950">
                                Uploaded by: {image.uploaderName}
                            </div>
                            <button
                                className="mt-2 text-xl text-blue-500 hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent click event bubbling to image click
                                    handleDownload(image.imageUrl);
                                }}
                            >
                                Download
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="h-[80vh] flex items-center justify-center text-2xl">No images found.</div>
                )}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleCloseModal}>
                    <div className="relative">
                        <img
                            src={selectedImage.imageUrl}
                            alt="Selected Image"
                            className="max-w-full max-h-full rounded"
                        />
                        <button
                            className="absolute top-2 right-2 text-white text-3xl font-bold"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventAllImages;
