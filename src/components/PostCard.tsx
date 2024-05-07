import { PostCardProps } from "@/utils/types";
import Image from "next/image";
import React from "react";

const PostCard: React.FC<PostCardProps> = ({ image_url, title, keywords }) => {
  return (
    <div className="flex-auto p-2">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-96 ">
        {image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-full h-48 object-cover"
            src={image_url}
            alt={title}
          />
        ) : (
          // I had to use the eslint-disable because img is the best option to use when
          // the api return multiple domains and if i use Image from Next
          // it throw an error that i should add the domain to next.config.mjs
          <Image
            className="w-full h-auto object-cover pt-4"
            src="/logo.svg"
            alt="Logo"
            height={60}
            width={60}
          />
        )}
        <div className="px-6 py-4 flex flex-col flex-grow ">
          <div className="font-bold text-md mb-2">{title}</div>
          <div className="flex-grow"></div>
          {keywords ? (
            <p className="text-gray-700 text-base">{keywords}</p>
          ) : (
            <p className="text-gray-700 text-base">No Keywords</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
