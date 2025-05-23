"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const fetchPartnerImages = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/v1/brand-logos`
  );
  return response?.data?.data;
};

const Partner = () => {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);

  const {
    data: partnerImages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["partner-images"],
    queryFn: fetchPartnerImages,
  });

  if (isLoading) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center ">Loading Banners...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="our-faq pt-20 py-12 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-red-600">{isError}</p>
        </div>
      </section>
    );
  }

  console.log("partnerImages", partnerImages);

  return (
    <>
      {showSlider && (
        <Swiper
          spaceBetween={10}
          slidesPerView={6}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 6 },
          }}
          loop={false} // Disable looping
          autoplay={{
            delay: 3000,
          }}
          className="swiper-container"
        >
          {partnerImages?.map((imageName) => (
            <SwiperSlide key={imageName?.id}>
              <div className="item">
                <div className="partner_item">
                  <Image
                    width={122}
                    height={24}
                    style={{ objectFit: "contain" }}
                    className="wa m-auto"
                    src={imageName?.image[0]}
                    alt={imageName?.title}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Partner;
