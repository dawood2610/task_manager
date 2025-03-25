import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Check for token whenever route changes
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/signup"
        element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
