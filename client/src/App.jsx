import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import {useState} from "react";
import AuthContext from "./context/AuthContext.jsx";
import Verify from "./pages/Verify/Verify.jsx";
import CreateEvent from "./pages/CreateEvent/CreateEvent.jsx";


function App() {
    const [user, setUser] = useState(null);
    const values = {user, setUser};

    return (
        <AuthContext.Provider value={values}>
            <Router>
                <Routes>
                    <Route element={<RootLayout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/new-event" element={<CreateEvent/>}/>
                        <Route path="/profile" element={<div className="h-screen text-5xl bg-yellow-50">Profile</div>}/>
                        <Route path="/all-events" element={<div className="h-screen text-5xl bg-yellow-50">User Events</div>}/>
                        <Route path="/about-us" element={<div className="h-screen text-5xl bg-yellow-50">About</div>}/>
                        <Route path="/contact-us" element={<div className="h-screen text-5xl bg-yellow-50">Contact</div>}/>
                    </Route>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/verify" element={<Verify/>}/>

                </Routes>
            </Router>
        </AuthContext.Provider>

    );
}

export default App;
