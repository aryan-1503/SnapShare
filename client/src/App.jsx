import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import {useEffect, useState} from "react";
import AuthContext from "./context/AuthContext.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import CreateEvent from "./pages/CreateEvent/CreateEvent.jsx";
import AuthGuard from "./components/AuthGuard/AuthGuard.jsx";
import AllEvents from "./pages/AllEvents/AllEvents.jsx";
import axios from "axios";


function App() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const res = await axios.get("http://localhost:5555/api/auth/me",{
                    withCredentials: true
                });
                setUser(res.data.user);

            }catch (error) {
                console.log("Error fetching user data : ",error);
            }
        }
        fetchUserData()
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <Router>
                <Routes>
                    <Route element={<RootLayout/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>
                    {
                        user ?
                            <Route element={<RootLayout/>}>

                                <Route path="/new-event" element={
                                    <AuthGuard>
                                        <CreateEvent/>
                                    </AuthGuard>
                                }/>
                                <Route path="/event/all" element={
                                    <AuthGuard>
                                        <AllEvents/>
                                    </AuthGuard>
                                }/>

                                <Route path="/profile"
                                       element={<div className="h-screen text-5xl bg-yellow-50">Profile</div>}/>
                                <Route path="/all-events"
                                       element={<div className="h-screen text-5xl bg-yellow-50">User Events</div>}/>
                                <Route path="/about-us"
                                       element={<div className="h-screen text-5xl bg-yellow-50">About</div>}/>
                                <Route path="/contact-us"
                                       element={<div className="h-screen text-5xl bg-yellow-50">Contact</div>}/>
                            </Route> :
                            <>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/verify" element={<Verify/>}/>
                            </>
                    }

                                <Route path="*" element={<Navigate to={"/"} />}/>
                </Routes>
            </Router>
        </AuthContext.Provider>

    );
}

export default App;
