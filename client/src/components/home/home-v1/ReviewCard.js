import lgVideo from "lightgallery/plugins/video";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white flex gap-2 rounded-lg border p-2 shadow-sm">
      {/* Video Section */}
      <LightGallery
        speed={500}
        plugins={[lgVideo]}
        elementClassNames="video-wrapper flex-shrink-0"
      >
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          data-lg-size="1280-720"
          data-video='{"source": [{"src":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","type":"youtube"}], "attributes": {"preload": false, "controls": true}}'
          className="relative block w-[320px] h-[180px] rounded-lg overflow-hidden group md:w-[400px] md:h-full"
        >
          <Image
            src={review.image[0]}
            alt="Review Video"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={false}
          />
          <FaPlayCircle className="absolute inset-0 m-auto text-white text-5xl opacity-80 group-hover:scale-110 transition-transform duration-200" />
        </a>
      </LightGallery>

      {/* Text Content */}
      <div className="flex flex-col justify-between flex-1">
        <Image
          src={review.image[0]}
          alt={review.name}
          width={80}
          height={80}
          className="rounded-lg object-cover w-full"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.message}</p>
        </div>
        <p className="text-gray-600">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
