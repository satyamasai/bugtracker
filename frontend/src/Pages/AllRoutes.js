import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import DragPage from "./DragPage";
import Private from "./PrivateRoutes/Private";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/mydashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route path="/drager" element={<DragPage />} />
    </Routes>
  );
};

export default AllRoutes;
