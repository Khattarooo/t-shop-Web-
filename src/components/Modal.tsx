import React from "react";
import Image from "next/image";
import { ModalProps } from "@/utils/types";

const Modal: React.FC<ModalProps> = ({
  closeModal,
  convertedPrice,
  image,
  Name,
  unit,
}) => {
  const formattedConvertedPrice = convertedPrice.toLocaleString();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-96 mim-w-[250px]">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mt-4 mr-4 text-red-600 hover:text-red-800 text-3xl"
        >
          X
        </button>
        <Image
          src={image}
          alt="Product"
          className="w-full h-auto rounded"
          width={250}
          height={200}
        />
        <h2 className="text-2xl font-bold mt-4">{Name}</h2>
        <p className="text-lg font-semibold mt-2">
          {formattedConvertedPrice} LBP
        </p>
        <p className="text-lg mt-2">Unit: {unit}</p>
      </div>
    </div>
  );
};

export default Modal;
