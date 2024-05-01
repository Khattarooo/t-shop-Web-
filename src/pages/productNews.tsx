import Navbar from "@/components/NavBar";
import React, { useEffect } from "react";

function ProductNews() {
  useEffect(() => {
    document.title = "News - T-Shop";
  }, []);
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "200px" }}>productNews</div>
    </div>
  );
}

export default ProductNews;
