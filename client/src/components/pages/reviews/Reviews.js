"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import lgVideo from "lightgallery/plugins/video";
import LightGallery from "lightgallery/react";

import { FaPlayCircle } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "lightgallery/css/lg-video.css";
import "lightgallery/css/lightgallery.css";

const fetchReviews = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/v1/reviews`
  );
  return response.data.data; // Adjust this according to your actual API response
};

const Reviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const getSingleImage = (image) => {
    // Return image URL if valid, else fallback path inside /public folder
    return image || "/fallback-image.jpg";
  };

  if (isLoading) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center">Loading Reviews...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-red-600">Failed to load reviews</p>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full">
      <div>
        <div className="main-title2 flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <Link
            href="/reviews"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            View All
          </Link>
        </div>
      </div>

      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".reviews-next__active",
          prevEl: ".reviews-prev__active",
        }}
        pagination={{
          el: ".reviews-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        }}
      >
        {reviews?.map((review, idx) => (
          <SwiperSlide key={review.id || idx}>
            <div className="rounded-xl shadow-lg bg-white flex flex-col md:flex-row gap-6 p-6 transition-all duration-300 hover:shadow-xl">
              {/* Video Thumbnail */}
              <LightGallery
                speed={500}
                plugins={[lgVideo]}
                elementClassNames="video-wrapper flex-shrink-0"
              >
                <a
                  href={
                    review.videoUrl ||
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  }
                  data-lg-size="1280-720"
                  data-video={JSON.stringify({
                    source: [
                      {
                        src:
                          review.videoUrl ||
                          "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        type: "youtube",
                      },
                    ],
                    attributes: { preload: false, controls: true },
                  })}
                  className="relative block w-full md:w-[500px] h-[300px] md:h-[350px] rounded-xl overflow-hidden group"
                >
                  <Image
                    src={getSingleImage(review.image?.[0])}
                    alt="Review Video Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-xl transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority={idx === 0} // Prioritize first image for performance
                  />
                  <FaPlayCircle className="absolute inset-0 m-auto text-white text-6xl opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300" />
                </a>
              </LightGallery>

              {/* Review Content */}
              <div className="flex flex-col justify-center flex-grow space-y-4">
                <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                  {review.name || "Anonymous"}
                </h4>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {review?.message?.length > 100
                    ? review.message.slice(0, 100) + "..."
                    : review.message || "No message provided"}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-lg">★★★★★</span>
                  <span className="text-sm text-gray-500">
                    {review.rating || "5.0"} / 5.0
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button className="reviews-prev__active swiper_button p-2 bg-gray-200 rounded hover:bg-gray-300">
          <i className="far fa-arrow-left-long" />
        </button>
        <div className="pagination swiper--pagination reviews-pagination__active" />
        <button className="reviews-next__active swiper_button p-2 bg-gray-200 rounded hover:bg-gray-300">
          <i className="far fa-arrow-right-long" />
        </button>
      </div>
    </div>
  );
};

export default Reviews;
