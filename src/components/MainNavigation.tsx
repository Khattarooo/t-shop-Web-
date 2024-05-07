import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
import Home from "@/pages/home";
import ProductsNews from "@/pages/productNews";
import AboutUs from "@/pages/aboutUs";

function MainNavigation() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productNews" element={<ProductsNews />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default MainNavigation;
