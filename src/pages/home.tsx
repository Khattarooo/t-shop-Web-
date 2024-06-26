import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/NavBar";
import ProductCard from "../components/ProductCard";
import { ProductCardProps } from "@/utils/types";
import { MockApi } from "@/utils/api";

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true);
  const limitPerPage: number = 6;
  
  useEffect(() => {
    document.title = "T-Shop";
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        `${MockApi}?page=${page}&limit=${limitPerPage}`
      );
      const data: ProductCardProps[] = await response.json();
      if (data.length === 0) {
        setHasMoreProducts(false);
      }
      if (page === 1) {
        setProducts(data);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page]);

  useEffect(() => {
    const handleScroll = () => {
      document.title = "T-Shop";
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight && hasMoreProducts) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreProducts]);

  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col h-full bg-white p-5 min-w-[400px] pt-20"
        style={{ paddingBottom: "30px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {!hasMoreProducts && (
          <div className="flex justify-center mt-4 bg-yellow-200 py-3 rounded-lg text-black text-2xl">
            No more products to load
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
