import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
const ImagesPreview = ({ images, setImages, setShowPreview }) => {
    const handleRemove = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    }
    return (
        <div className="shadow-2xl bg-yellow-50 h-screen w-screen overflow-y-scroll">
            <div className="flex flex-col justify-center items-center">
                <div className="py-2 px-4 flex justify-between items-center gap-4 border-b-2 border-yellow-950 font-bold font-dancing-script text-3xl w-full">
                    Preview
                    <button onClick={() => {setShowPreview(false)}} style={{border: "none"}}><IoCloseOutline /></button>
                </div>
                <div className="flex flex-col items-center justify-center p-4 overflow-scroll">
                    {images.map((image, index) => (
                        <div className="single-image flex flex-col justify-center items-end p-1" key={index}>
                            <img src={URL.createObjectURL(image)} alt={image.name} />
                            <button onClick={() => handleRemove(index)} className="font-cinzel text-lg">remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImagesPreview;