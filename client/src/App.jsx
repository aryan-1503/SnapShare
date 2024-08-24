import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import CreateEvent from "./pages/CreateEvent/CreateEvent.jsx";
import AllEvents from "./pages/AllEvents/AllEvents.jsx";
import { api } from "./api/base.js";
import EditSingleEvent from "./pages/EditSingleEvent/EditSingleEvent.jsx";
import EventPage from "./pages/EventPage/EventPage.jsx";
import EventPageLayout from "./layouts/EventPageLayout.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import EventQrCodePage from "./pages/EventQrCodePage/EventQrCodePage.jsx";

function App() {
    const [user, setUser] = useState(null);
    const [tempUser,setTempUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get("auth/me");
                setUser(res.data.user);
            } catch (error) {
                console.log("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div className="bg-yellow-50"></div>;
    }

    return (
        <AuthContext.Provider value={{ user, setUser, tempUser, setTempUser }}>
            <Router>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<div className="h-screen text-5xl bg-yellow-50">About</div>} />
                        <Route path="/contact-us" element={<div className="h-screen text-5xl bg-yellow-50">Contact</div>} />
                    </Route>
                    <Route element={<EventPageLayout />}>
                        <Route path={`/event/${user.username}/:id`} element={<EventPage />} />
                    </Route>
                    {user ? (
                        <Route element={<RootLayout />}>
                            <Route path="/new-event" element={<CreateEvent />} />
                            <Route path="/event/all" element={<AllEvents />} />
                            <Route path="/edit-event/:id" element={<EditSingleEvent />} />
                            <Route path="/event-qr-code/:id" element={<EventQrCodePage />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    ) : (
                        <>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/verify" element={<Verify />} />
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
