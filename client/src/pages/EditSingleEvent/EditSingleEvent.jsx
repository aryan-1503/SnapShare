import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {api} from "../../api/base.js";
import AuthContext from "../../context/AuthContext.jsx";
import {IoIosAdd} from "react-icons/io";
import {MdOutlineDelete} from "react-icons/md";
import Loading from "../../components/Loading/Loading.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSingleEvent = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [eventDetails, setEventDetails] = useState(null);
    const fileInputRef = React.useRef();
    const [selectedPhoto,setSelectedPhoto] = useState(null);
    const [categories,setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        eventName: "",
        eventPhoto: selectedPhoto,
        eventTime: "",
        categories: []
    });
    const handleClick = (e) => {
        e.preventDefault()
        fileInputRef.current.click();
    };
    useEffect(() => {
        const fetchSingleEvent = async () => {
            try{
                setLoading(true)
                const res = await api.get(`/event/${id}`)
                const event = res.data.event;
                setEventDetails(event)
                setCategories(event.categories)
                setFormData({
                    eventName: event.eventName,
                    eventPhoto: selectedPhoto,
                    eventTime: event.eventTime,
                    categories: categories
                })
            }catch (e) {
                console.log(e)
            }finally {
                setLoading(false)
            }

        }
        fetchSingleEvent();
    }, []);



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

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
    };


    const handleSaveChanges = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("eventName",formData.eventName);
        data.append("eventPhoto",formData.eventPhoto);
        data.append("eventTime",formData.eventTime);
        data.append("subEvent",selectedCategory);
        categories.forEach((category) => {
            data.append('categories[]', category);
        });

        try {
            const res = await api.patch(`event/edit-event/${id}`, data,{
                headers: {
                    "Content-Type":'multipart/form-data'
                },
            })
            // alert(res.data.message)
            toast.success(res.data.message,{
                position: "top-center"
            })
            // console.log(res.data)
        }catch (e) {
            console.log(e)
        }

    }


    if (loading){
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-yellow-50">
                <Loading />
            </div>
        )
    }
    return (
        <>
            <div className="w-screen h-screen bg-yellow-50 flex justify-evenly items-center ">
                <Link to={`https://snap-share-xi.vercel.app/event/${id}`} className="p-1 mxs:hidden msm:hidden mmd:hidden">
                    <iframe src={`https://snap-share-xi.vercel.app/event/${id}`} frameBorder="0" title="Preview" className="h-[90vh] w-[350px] border-2 border-yellow-950" ></iframe>
                </Link>
                <div className="w-1/3 flex flex-col gap-4 justify-center items-center hover:rounded hover:shadow-2xl p-4 mxs:w-full msm:w-3/4 mmd:w-2/3">
                    <div className="text-3xl text-yellow-950">Edit Details</div>
                    <form onSubmit={handleSaveChanges} className="flex flex-col gap-4 w-full">
                        <input
                            type="text"
                            value={formData.eventName}
                            name="eventName"
                            onChange={handleChange}
                            placeholder="Event Name"
                            className="w-full text-lg pl-2 bg-yellow-50 border-2 border-amber-950 p-1 placeholder:text-yellow-800"
                        />
                        <div className="border-2 border-yellow-950 p-1 text-yellow-950 overflow-hidden">
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
                            Sub Events
                            <ol className="overflow-y-scroll max-h-20 scrollbar scrollbar-track-yellow-50">
                                {categories.length > 0 ? categories.map((category, index) => (
                                    <li key={index} className="flex items-center justify-between gap-8 text-lg font-light pl-2">
                                        - {category} <button type="button" onClick={() => handleDelete(index)}><MdOutlineDelete className="text-xl" /></button>
                                    </li>
                                )) : (
                                    <div className="font-light text-xl pl-2">
                                        - No items
                                    </div>
                                )}
                            </ol>
                        </div>
                        <div className="my-4 w-full">
                            <label htmlFor="category-select" className="font-semibold text-xl text-yellow-950">Current Sub Event : </label>
                            <select
                                id="category-select"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="p-1 border-2 border-yellow-950 rounded bg-yellow-50 text-yellow-950"
                            >
                                <option value="" className="bg-yellow-50 text-yellow-950">Select SubEvent</option>
                                {categories.length > 0 && categories.map((cat, index) => (
                                    <option key={index} value={cat} className="bg-yellow-50 text-yellow-950">{cat}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="p-2 flex justify-center items-center bg-yellow-950 rounded-md font-[500] text-[18px] text-[#FFFFF0] hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95">Save Changes</button>
                        <ToastContainer />
                    </form>
                </div>

            </div>
        </>

    );
};

export default EditSingleEvent;