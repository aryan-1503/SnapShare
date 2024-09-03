import React, {useContext, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import { api } from "../../api/base.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Register = () => {
    const [formData,setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setTempUser } = useContext(AuthContext)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData,[name] : value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        if(formData.confirmPassword !== formData.password){
            toast.error("Passwords doesn't match",{
                position: "top-center"
            })
            return;
        }
        const { confirmPassword, ...data } = formData;
        // console.log(data);
        try{
            setLoading(true);
            const res = await api.post("/auth/register",data);
            // console.log("RESPONSE : ",res.data);
            setTempUser(res.data.savedUser)
            // alert(res.data.message)
            setTimeout(() => {
                toast.success(res.data.message, {
                    position: "top-center",
                });
            },1000)

            navigate("/verify")
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An unexpected error occurred");
                console.log(error)
            }
            console.log(error.message);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-screen h-screen bg-yellow-50 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-[#2f1a1a] w-[22%] h-auto p-4 rounded-[0.5rem] shadow mxs:w-[270px] msm:w-[330px] mmd:w-[340px] mlg:w-[350px]">
                <div className="flex justify-center flex-col items-center text-[35px] gap-4 text-amber-100 mb-3">
                    Register
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center gap-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            className="h-[2.5rem] w-[130%] rounded pl-[0.6rem] border-2 border-amber-950 font-[500] text-[17px] mxs:w-[105%]"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                            className="h-[2.5rem] w-[130%] rounded pl-[0.6rem] border-2 border-amber-950 font-[500] text-[17px] mxs:w-[105%]"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="h-[2.5rem] w-[130%] rounded pl-[0.6rem] border-2 border-amber-950 font-[500] text-[17px] mxs:w-[105%]"
                        />
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                            className="h-[2.5rem] w-[130%] rounded pl-[0.6rem] border-2 border-amber-950 font-[500] text-[17px] mxs:w-[105%]"
                        />

                        <button type="submit" className="w-[130%] h-[2.5rem] rounded bg-amber-100 text-[#2f1a1a] font-bold text-[20px] active:scale-[0.98] mxs:w-[105%]">
                            {loading ? <div style={{display:"grid",placeItems:"center"}}><Loading /></div> : "Register"}
                        </button>
                        <ToastContainer />
                    </form>
                    <div className="mt-3 text-[#dedcdc] flex justify-center p-[1rem 0 0.5rem 0] text-[20px]">
                        Already registered ?
                        <Link to="/login" className="pl-[0.5rem] text-amber-100">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;