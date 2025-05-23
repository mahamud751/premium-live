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
            slidesPerView: 3,
          },
        }}
      >
        {reviews?.map((review, idx) => (
          <SwiperSlide key={review.id || idx}>
            <div className="  rounded-lg shadow-md flex flex-col md:flex-row  gap-1 ">
              <LightGallery
                speed={500}
                plugins={[lgVideo]}
                elementClassNames="video-wrapper flex-shrink-0"
              >
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  data-lg-size="1280-720"
                  data-video='{"source": [{"src":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","type":"youtube"}], "attributes": {"preload": false, "controls": true}}'
                  className="relative block w-full md:w-[400px] h-[300px] rounded-lg overflow-hidden group"
                >
                  <Image
                    src={getSingleImage(review.image?.[0])}
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

              <div className="flex flex-col justify-center flex-grow">
                <div className="flex items-center mb-4">
                  <Image
                    src={getSingleImage(review.image?.[0])}
                    alt={review.name || "Customer Review"}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-[300px]"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {review.name || "Anonymous"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {review?.message?.length > 80
                      ? review.message.slice(0, 80) + "..."
                      : review.message || "No message provided"}
                  </p>
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
