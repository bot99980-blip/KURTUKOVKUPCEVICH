import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { HistoricalEvent } from "../data/types";

interface SwipProps {
  events: HistoricalEvent[];
}

const Swip: React.FC<SwipProps> = ({ events }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    swiperRef?.slidePrev();
  };

  const handleNext = () => {
    swiperRef?.slideNext();
  };

  return (
    <div className="Swip">
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={40}
        grabCursor={true}
        onSwiper={setSwiperRef}
        onSlideChange={handleSlideChange}
        className="Swip__swiper"
      >
        {events.map((event, index) => (
          <SwiperSlide key={`${event.year}-${index}`} className="Swip__slide">
            <div className="Swip__card">
              <h3 className="Swip__year">{event.year}</h3>
              <p className="Swip__description">{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`Swip__nav-btn Swip__nav-btn--prev ${isBeginning ? "is-hidden" : ""}`}
        onClick={handlePrev}
        aria-label="Предыдущий слайд"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        className={`Swip__nav-btn Swip__nav-btn--next ${isEnd ? "is-hidden" : ""}`}
        onClick={handleNext}
        aria-label="Следующий слайд"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Swip;
