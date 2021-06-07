import TemplateLayout from "@layouts/templateLayout";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const renderSlides = () => {
  return (
    <>
      <SwiperSlide className="flex flex-row items-center justify-center bg-green-100">
        Slide 1
      </SwiperSlide>
      <SwiperSlide className="flex flex-row items-center justify-center bg-blue-100">
        Slide 2
      </SwiperSlide>
      <SwiperSlide className="flex flex-row items-center justify-center bg-red-100">
        Slide 3
      </SwiperSlide>
      <SwiperSlide className="flex flex-row items-center justify-center bg-pink-100">
        Slide 4
      </SwiperSlide>
    </>
  );
};

const CarouselTemplatePage = () => {
  return (
    <TemplateLayout>
      <h4>Navigation</h4>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-96"
        navigation={true}
      >
        {renderSlides()}
      </Swiper>
      <h4>Pagination</h4>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-96"
        pagination={true}
      >
        {renderSlides()}
      </Swiper>
      <h4>Infinite Loop</h4>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-96"
        pagination={true}
        loop={true}
      >
        {renderSlides()}
      </Swiper>
      <a
        href="https://swiperjs.com/react"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default CarouselTemplatePage;
