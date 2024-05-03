import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./NavBar";
import Home from "@/pages/home";
import ProductsNews from "@/pages/productNews";

function MainNavigation() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productNews" element={<ProductsNews />} />
      </Routes>
    </Router>
  );
}

export default MainNavigation;
