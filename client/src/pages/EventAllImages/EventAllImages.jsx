import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/base.js';

const EventAllImages = () => {
    const { id } = useParams();
    const [event,setEvent] = useState([]);
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

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
                const response = await fetch('https://weddingsnapshots.onrender.com/api/upload/images');

                if (response.ok) {
                    const data = await response.json();
                    setImages(data);
                    setFilteredImages(data); // Initially show all images
                } else {
                    console.error('Error fetching images:', response.message);
                    alert(response.message);
                }
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
            setFilteredImages(images); // Show all images if no category is selected
        } else {
            setFilteredImages(images.filter(img => img.category === category));
        }
    };

    const handleDownload = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    };

    return (
        <div className="flex flex-col justify-center items-center bg-yellow-50 p-4">
            <div className="pb-1 w-full text-4xl text-center font-dancing-script border-b-2 border-yellow-950">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                    <div className="col-span-full text-center">Loading...</div>
                ) : filteredImages.length > 0 ? (
                    filteredImages.map((image, index) => (
                        <div key={index} className="flex flex-col items-center bg-yellow-50 p-4 shadow-lg rounded w-full">
                            <img
                                src={image.img}
                                alt={`Event Image ${index + 1}`}
                                className="w-full h-48 object-cover rounded"
                                onClick={() => window.open(`https://weddingsnapshots.onrender.com/${image.path}`, '_blank')}
                            />
                            <hr/>
                            <button
                                className="mt-2 text-xl text-blue-500 hover:underline"
                                onClick={() => handleDownload(`https://weddingsnapshots.onrender.com/${image.path}`, `image_${index + 1}.png`)}
                            >
                                Download
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center">No images found.</div>
                )}
            </div>
        </div>
    );
};

export default EventAllImages;
