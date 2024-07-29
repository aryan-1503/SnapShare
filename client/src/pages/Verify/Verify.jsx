import React, {useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import AuthContext from "../../context/AuthContext.jsx";

const Verify = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user,setUser} = useContext(AuthContext)

    const handleChange = (e) => {
        setVerificationCode(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5555/api/auth/verify", { email: user.email,verificationCode: verificationCode }, {
                withCredentials: true
            });
            console.log("RESPONSE:", res.data);
            alert(res.data.message);
            setUser(res.data.user)
            navigate("/");
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-screen h-screen bg-yellow-50 flex justify-center items-center shadow]">
            <div className="wrapper flex flex-col justify-center items-center bg-[#2f1a1a] w-[22%] h-auto p-4 rounded-[0.5rem] shadow mxs:w-[270px] msm:w-[330px] mmd:w-[340px] mlg:w-[350px]">
                <div className="flex justify-center flex-col items-center text-[35px] gap-4 text-amber-100 mb-3">
                    Verify Email
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center gap-4">
                        <input
                            type="text"
                            name="verificationCode"
                            placeholder="Verification Code"
                            onChange={handleChange}
                            required
                            className="h-[2.5rem] w-[120%] rounded pl-[0.6rem] border-2 border-amber-950 font-[500] text-[17px] mxs:w-[105%]"
                        />
                        <button type="submit" className="w-[120%] h-[2.5rem] rounded bg-amber-100 text-[#2f1a1a] font-bold text-[20px] active:scale-[0.98] mxs:w-[105%]">
                            {loading ? <div style={{ display: "grid", placeItems: "center" }}><Loading /></div> : "Verify"}
                        </button>
                    </form>
                    <div className="mt-3 text-[#dedcdc] flex justify-center p-[1rem 0 0.5rem 0] text-[20px]">
                        Didn't receive a code?
                        <Link to="/resend-code" className="pl-[0.5rem] text-amber-100">Resend</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verify;