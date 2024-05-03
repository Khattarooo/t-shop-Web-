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
    <button
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 "
    >
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-96 mim-w-[250px]">
        <Image
          src={image}
          alt="Product"
          className="w-full h-auto rounded"
          width={250}
          height={200}
          priority
        />
        <h2 className="text-2xl font-bold mt-4">{Name}</h2>
        <p className="text-lg font-semibold mt-2">
          {formattedConvertedPrice} LBP
        </p>
        <p className="text-lg mt-2">Unit: {unit}</p>
      </div>
    </button>
  );
};

export default Modal;
