import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import { useEffect, useState, lazy, Suspense } from "react";
import AuthContext from "./context/AuthContext.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import { api } from "./api/base.js";
import Loading from "./components/Loading/Loading.jsx";
import Upload from "./pages/Upload/Upload.jsx";
import EventAllImages from "./pages/EventAllImages/EventAllImages.jsx";


const CreateEvent = lazy(() => import("./pages/CreateEvent/CreateEvent.jsx"));
const AllEvents = lazy(() => import("./pages/AllEvents/AllEvents.jsx"));
const EditSingleEvent = lazy(() => import("./pages/EditSingleEvent/EditSingleEvent.jsx"));
const EventPage = lazy(() => import("./pages/EventPage/EventPage.jsx"));
const EventPageLayout = lazy(() => import("./layouts/EventPageLayout.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const EventQrCodePage = lazy(() => import("./pages/EventQrCodePage/EventQrCodePage.jsx"));

function App() {
    const [user, setUser] = useState(null);
    const [tempUser, setTempUser] = useState(null);
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

    return (
        <AuthContext.Provider value={{ user, setUser, tempUser, setTempUser }}>
            <Router>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<div className="h-screen text-5xl bg-yellow-50">About</div>} />
                        <Route path="/contact-us" element={<div className="h-screen text-5xl bg-yellow-50">Contact</div>} />
                    </Route>
                    <Route element={<Suspense fallback={<Loading />}><EventPageLayout /></Suspense>}>
                        <Route path={`/event/:id`} element={<EventPage />} />
                        <Route path={`/event/:id/upload`} element={<Upload />} />
                        <Route path={`/event/:id/all-images`} element={<EventAllImages />} />
                    </Route>
                    {user ? (
                        <Route element={<Suspense fallback={<Loading />}><RootLayout /></Suspense>}>
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
