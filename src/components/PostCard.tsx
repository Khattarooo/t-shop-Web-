import Image from "next/image";
import React from "react";

interface PostCardProps {
  image_url?: string;
  title?: string;
  description?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  image_url,
  title,
  description,
}) => {
  return (
    <div className="flex-auto p-2">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-96 ">
        {image_url ? (
          <img
            className="w-full h-48 object-cover"
            src={image_url}
            alt={title}
          />
        ) : (
          <Image
            className="w-full h-48 object-cover"
            src="/logo.svg"
            alt="Logo"
            height={90}
            width={90}
          />
        )}
        <div className="px-6 py-4 flex flex-col flex-grow ">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base flex-grow ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
