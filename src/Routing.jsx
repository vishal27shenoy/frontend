import React, { useContext } from "react";
import App from "../src/App";
import LoginandRegistration from "./component/LoginandRegistration";
import NavbarAndSidebar from "./component/NavbarAndSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext, { UserContext } from "./context/Context";
import RequireAuth from "./utils/RequireAuth";

const Routing = () => {
  // const { history } = useContext();

  return (
    <AuthContext>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginandRegistration />} />

          {/* Restricted routes */}
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<NavbarAndSidebar />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext>
  );
};

export default Routing;
