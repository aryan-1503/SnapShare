import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {api} from "../../api/base.js";
import AuthContext from "../../context/AuthContext.jsx";
import {IoCloudUploadOutline} from "react-icons/io5";
import {IoIosAdd} from "react-icons/io";
import {MdOutlineDelete} from "react-icons/md";

const EditSingleEvent = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [eventDetails, setEventDetails] = useState([]);
    const fileInputRef = React.useRef();
    const [selectedPhoto,setSelectedPhoto] = useState(null);
    const [categories,setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');

    const handleClick = (e) => {
        e.preventDefault()
        fileInputRef.current.click();
    };

    const [formData, setFormData] = useState({
        eventName: "",
        eventPhoto: selectedPhoto,
        eventTime: "",
        description: "",
        categories: []
    });

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



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file){
            setSelectedPhoto(URL.createObjectURL(file));
            setFormData({
                ...formData,
                eventPhoto: file
            })
        }

    }

    const handleAdd = (e) => {
        e.preventDefault();
        if (categoryInput.trim() !== '') {
            const updatedCategories = [...categories, categoryInput];
            setCategories(updatedCategories);
            setFormData({
                ...formData,
                categories: updatedCategories
            });
            setCategoryInput('');
        }
    };
    const handleDelete = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        setFormData({
            ...formData,
            categories: updatedCategories
        });
    };


    useEffect(() => {
        const fetchSingleEvent = async () => {
            const res = await api.get(`/new-event/${id}`)
            setEventDetails(res.data.event)
            setCategories(res.data.event.categories)
        }
        fetchSingleEvent();
    }, []);


    return (
        <div className="w-screen h-screen bg-yellow-50 flex justify-evenly items-center">
            <Link to={`http://localhost:5173/event/${user.username}/${id}`} className="p-1">
                <iframe src={`http://localhost:5173/event/${user.username}/${id}`} frameBorder="0" title="Preview" className="h-[90vh] w-[350px] border-2 border-yellow-950" ></iframe>
            </Link>
            <div className="w-1/3 flex flex-col gap-4 justify-center items-center hover:rounded hover:shadow-2xl p-4">
                <div className="text-3xl text-yellow-950">Edit Details</div>
                <form action="" className="flex flex-col gap-4 w-full">
                    <input
                        type="text"
                        value={formData.eventName}
                        name="eventName"
                        onChange={handleChange}
                        placeholder={eventDetails.eventName}
                        className="w-full text-lg pl-2 bg-yellow-50 border-2 border-amber-950 p-1 placeholder:text-yellow-800"
                    />
                    <div className="border-2 border-yellow-950 p-1 text-yellow-950">
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            className="text-lg pl-2 bg-yellow-50 border-2 border-amber-950 p-1 placeholder:text-yellow-800"
                        />
                        <button
                            onClick={handleClick}
                            className="custom-file-upload text-yellow-50 bg-amber-950 p-1 mr-2"
                        >
                            Choose File
                        </button>
                        {selectedPhoto ? formData.eventPhoto.name : "No file chosen"}
                    </div>
                    <label htmlFor="eventDate" className="text-xl text-yellow-900 border-2 border-yellow-950 p-1 flex justify-between">
                        Event Time:
                        <input
                            type="month"
                            name="eventTime"
                            id="eventDate"
                            className="bg-yellow-50 pl-3"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="flex gap-2 w-full">
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
                </form>
            </div>

        </div>
    );
};

export default EditSingleEvent;