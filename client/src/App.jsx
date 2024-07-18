import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<RootLayout/>} >
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
