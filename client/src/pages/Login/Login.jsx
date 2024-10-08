import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import Loading from "../../components/Loading/Loading.jsx";
import { api } from "../../api/base.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { confirmPassword, ...data } = formData;
        try {
            setLoading(true);
            const res = await api.post("/auth/login", data, {
                withCredentials: true
            });
            // console.log("RESPONSE: ", res.data);
            // alert(res.data.message);
            toast.success(res.data.message, {
                position: "top-center",
            });
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            },700)

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message,{
                    position: "top-center"
                })
            } else {
                toast.error("An unexpected error occurred",{
                    position: "top-center"
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-screen h-screen bg-yellow-50 flex justify-center items-center shadow]">
            <div className="wrapper flex flex-col justify-center items-center bg-[#2f1a1a] w-[22%] h-auto p-4 rounded-[0.5rem] shadow mxs:w-[270px] msm:w-[330px] mmd:w-[340px] mlg:w-[350px]">
                <div className="flex justify-center flex-col items-center text-[35px] gap-4 text-amber-100 mb-3">
                    Login
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center gap-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            className="h-[2.5rem] w-[120%] rounded pl-[0.6rem] border-2 border-amber-950 font-[500] text-[17px] mxs:w-[105%]"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="h-[2.5rem] w-[120%] rounded pl-[0.6rem] border-2 border-amber-950 font-[500] text-[17px] mxs:w-[105%]"
                        />
                        <button type="submit" className="w-[120%] h-[2.5rem] rounded bg-amber-100 text-[#2f1a1a] font-bold text-[20px] active:scale-[0.98] mxs:w-[105%]">
                            {loading ? <div style={{ display: "grid", placeItems: "center" }}><Loading /></div> : "Login"}
                        </button>
                        <ToastContainer />
                    </form>
                    <div className="mt-3 text-[#dedcdc] flex justify-center p-[1rem 0 0.5rem 0] text-[20px]">
                        Not yet registered?
                        <Link to="/register" replace={true} className="pl-[0.5rem] text-amber-100">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
