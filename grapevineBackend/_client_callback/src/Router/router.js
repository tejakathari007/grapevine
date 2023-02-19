import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminValue } from "../Context/AdminContext";
import Nav from "../Navigation/Nav";
import GvUsers from "../Pages/GvUsers/GvUsers";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "../Pages/Terms/Terms";
import UserProfile from "../Pages/UserProfile/UserProfile";
import AllPosts from "../Pages/AllPosts/AllPosts";
import TiktokLoginSuccess from "../Pages/TiktokLoginSuccess/TiktokLoginSuccess";
import TiktokLoginFail from "../Pages/TiktokLoginFail/TiktokLoginFail";

const Router = () => {
  const { admin } = useContext(AdminValue);
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="/users" element={admin ? <GvUsers /> : <Login />} />
            <Route
              path="/user-profile/:uuid"
              element={admin ? <UserProfile /> : <Login />}
              // element={<UserProfile />}
            />
            <Route path="/posts" element={<AllPosts />} />
            <Route
              path="/tiktok/call_back/success"
              element={<TiktokLoginSuccess />}
            />
            <Route
              path="/tiktok/call_back/fail"
              element={<TiktokLoginFail />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Router;
