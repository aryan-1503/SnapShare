import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";


function App() {


  return (
    <Router>
      <Routes>
        <Route element={<RootLayout/>} >
          <Route path="/" element={<h1>HOME</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
