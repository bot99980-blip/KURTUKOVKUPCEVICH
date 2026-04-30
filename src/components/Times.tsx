import React, { useState, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import { HistoricalPeriod } from "../data/types";
import { historicalPeriods } from "../data/periods";
import Sqr from "./Sqr";
import Epoch from "./Epoch";
import Pager from "./Pager";
import "./Main.scss";
import Swip from "./Swip";

interface TimesProps {
  periods?: HistoricalPeriod[];
}

const Times: React.FC<TimesProps> = ({ periods = historicalPeriods }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const activePeriod = periods[activeIndex];

  const animateSliderTransition = useCallback((callback: () => void) => {
    if (!sliderContainerRef.current) {
      callback();
      return;
    }

    setIsAnimating(true);

    gsap.to(sliderContainerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.Out",
      onComplete: () => {
        callback();
        gsap.to(sliderContainerRef.current, {
          opacity: 1,
          duration: 1,
          onComplete: () => setIsAnimating(false),
        });
      },
    });
  }, []);

  const handlePeriodChange = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimating) return;
      animateSliderTransition(() => {
        setActiveIndex(index);
      });
    },
    [activeIndex, isAnimating, animateSliderTransition],
  );

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      handlePeriodChange(activeIndex - 1);
    }
  }, [activeIndex, handlePeriodChange]);

  const handleNext = useCallback(() => {
    if (activeIndex < periods.length - 1) {
      handlePeriodChange(activeIndex + 1);
    }
  }, [activeIndex, periods.length, handlePeriodChange]);

  useEffect(() => {
    if (componentRef.current) {
      gsap.fromTo(
        componentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
      );
    }
  }, []);

  return (
    <div className="timeline" ref={componentRef}>
      <div className="timeline__decorations">
        <div className="timeline__vertical-line timeline__vertical-line--left" />
        <div className="timeline__vertical-line timeline__vertical-line--center" />
        <div className="timeline__vertical-line timeline__vertical-line--right" />
        <div className="timeline__horizontal-line" />
      </div>

      <div className="timeline__header">
        <div className="timeline__accent-line" />
        <h1 className="timeline__title">
          Исторические
          <br />
          даты
        </h1>
      </div>

      <div className="timeline__main">
        <div className="timeline__circle-area">
          <Sqr
            periods={periods}
            activeIndex={activeIndex}
            hoveredIndex={hoveredIndex}
            onSelect={handlePeriodChange}
            onHover={setHoveredIndex}
          />
          <Epoch
            startYear={activePeriod.startYear}
            endYear={activePeriod.endYear}
          />
        </div>
      </div>

      <Pager
        currentIndex={activeIndex}
        totalCount={periods.length}
        category={activePeriod.category}
        onPrev={handlePrev}
        onNext={handleNext}
        canGoPrev={activeIndex > 0}
        canGoNext={activeIndex < periods.length - 1}
      />

      <div className="timeline__slider-wrapper" ref={sliderContainerRef}>
        <Swip events={activePeriod.events} key={activePeriod.id} />
      </div>
    </div>
  );
};

export default Times;
