import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";

const AboutUs: React.FC = () => {
  useEffect(() => {
    document.title = "AboutUs-T-Shop";
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <div className="w-full h-screen bg-cover bg-fixed bg-center bg-[url('/w1.jpg')] flex justify-center items-center">
        <div className="bg-white w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 2xl:w-1/3 rounded-lg shadow-lg p-8 m-4">
          <h1 className="text-3xl font-bold mb-6">Welcome to T-Shop</h1>
          <p className="text-lg mb-4">
            T-Shop is your go-to website for all your grocery needs.
          </p>
          <p className="text-lg mb-4">
            Explore a wide variety of fresh fruits and vegetables, sourced
            directly from local markets.
          </p>
          <p className="text-lg mb-4">
            Stay updated with the latest product news and offers to make
            informed shopping decisions.
          </p>
          <div className="flex items-center mt-6">
            <span className="text-lg font-bold">Contact us:</span>
            <span className="text-lg ml-2">support@Tshop.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
