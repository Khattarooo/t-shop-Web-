import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  image: string;
  Name: string;
  price: number;
  currency: string;
  unit: string;
  isAvailable: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  Name,
  price,
  currency,
  unit,
  isAvailable,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<string>("");

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (currency === "USD") {
      const conversionRate = 90000;
      const convertedAmount = price * conversionRate;
      const formattedPrice = convertedAmount.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      setConvertedPrice(formattedPrice);
    }
  };

  return (
    <div className="p-4 border rounded shadow-lg bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{Name}</h2>
        <span className={isAvailable ? "text-green-600" : "text-red-600"}>
          {isAvailable ? "Available" : ""}
        </span>
      </div>
      <div className="mt-2 flex justify-center">
        <Image
          src={image}
          alt={Name}
          className="w-56 h-72 object-contain rounded"
          width={500}
          height={500}
        />
      </div>
      <div className="mt-2 flex justify-between items-center">
        {isAvailable ? (
          <>
            <p className="text-lg font-semibold">
              {price} {currency}/{unit}
            </p>
            <button
              onClick={toggleModal}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Show Price in LBP
            </button>
          </>
        ) : (
          <p className={" text-red-600 text-2xl text-center"}>Out Of Stock</p>
        )}
      </div>
      {modalVisible && (
        <Modal
          closeModal={toggleModal}
          convertedPrice={convertedPrice}
          image={image}
          Name={Name}
          unit={unit}
        />
      )}
    </div>
  );
};

export default ProductCard;
