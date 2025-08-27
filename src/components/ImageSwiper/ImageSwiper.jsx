"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const tinyBlur =
  "data:image/jpeg;base64,/9j/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgT/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9Af//Z";

const images = [
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738280150/THALEA-PALERMO-APARTMENT/4-Canti-resize2.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739468957/THALEA-PALERMO-APARTMENT/Arance%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341325/THALEA-PALERMO-APARTMENT/eremiti-resize.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341325/THALEA-PALERMO-APARTMENT/duomo-monreale-resize.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469132/THALEA-PALERMO-APARTMENT/Casa-professa%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469298/THALEA-PALERMO-APARTMENT/Foro-it%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469447/THALEA-PALERMO-APARTMENT/preto%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341327/THALEA-PALERMO-APARTMENT/Isola-resize.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738341327/THALEA-PALERMO-APARTMENT/Chiese-resize.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469625/THALEA-PALERMO-APARTMENT/vista%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739469835/THALEA-PALERMO-APARTMENT/catedral-night%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470154/THALEA-PALERMO-APARTMENT/barca%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1738342495/THALEA-PALERMO-APARTMENT/Politeama-2-resize.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470397/THALEA-PALERMO-APARTMENT/monumento%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470512/THALEA-PALERMO-APARTMENT/foro2%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470604/THALEA-PALERMO-APARTMENT/barca2%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470715/THALEA-PALERMO-APARTMENT/cat3%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470805/THALEA-PALERMO-APARTMENT/pretoria%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470905/THALEA-PALERMO-APARTMENT/cat4%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739470990/THALEA-PALERMO-APARTMENT/sdraio%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
  {
    src: "https://res.cloudinary.com/dbxysr1a6/image/upload/v1739471062/THALEA-PALERMO-APARTMENT/limoni%20%281%29.jpg",
    blurDataURL: tinyBlur,
  },
];

const ImageSwiper = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "#46331d" }}
        >
          {t("swiper.title")}
        </h2>
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="rounded-lg"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={img.src}
                    alt={`Palermo ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw,
         (max-width: 768px) 50vw,
         (max-width: 1024px) 33vw,
         25vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ImageSwiper;
