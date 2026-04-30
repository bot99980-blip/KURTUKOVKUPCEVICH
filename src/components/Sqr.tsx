import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { HistoricalPeriod } from "../data/types";

interface SqrProps {
  periods: HistoricalPeriod[];
  activeIndex: number;
  hoveredIndex: number | null;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
}

const Sqr: React.FC<SqrProps> = ({
  periods,
  activeIndex,
  hoveredIndex,
  onSelect,
  onHover,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveIndex = useRef(activeIndex);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const count = periods.length;
  const circleRadius = 266;
  const activeAngle = -60;
  const angleStep = 360 / count;

  useEffect(() => {
    dotRefs.current.forEach((dotEl) => {
      if (dotEl) {
        gsap.set(dotEl, { rotation: 0 });
      }
    });
  }, []);

  const getDotPosition = (index: number) => {
    const angle = ((activeAngle - index * angleStep) * Math.PI) / 180;
    return {
      x: Math.cos(angle) * circleRadius,
      y: Math.sin(angle) * circleRadius,
    };
  };

  const getShortestRotation = (fromIndex: number, toIndex: number) => {
    let diff = toIndex - fromIndex;
    if (Math.abs(diff) > count / 2) {
      diff = diff > 0 ? diff - count : diff + count;
    }
    return diff;
  };

  useEffect(() => {
    if (!circleRef.current || isMobileRef.current) return;

    const prevIndex = prevActiveIndex.current;
    if (activeIndex === prevIndex) return;

    const diff = getShortestRotation(prevIndex, activeIndex);

    gsap.to(circleRef.current, {
      rotation: `+=${diff * angleStep}`,
      duration: 0.8,
      ease: "power3.Out",
    });

    dotRefs.current.forEach((dotEl) => {
      if (dotEl) {
        gsap.to(dotEl, {
          rotation: `-=${diff * angleStep}`,
          duration: 0.8,
          ease: "power3.Out",
        });
      }
    });

    prevActiveIndex.current = activeIndex;
  }, [activeIndex, angleStep, count]);

  const dotPositions = useMemo(() => {
    return periods.map((_, index) => getDotPosition(index));
  }, [count]);

  const isActive = (index: number) => index === activeIndex;
  const isHovered = (index: number) =>
    index === hoveredIndex && !isActive(index);

  if (count < 2 || count > 6) return null;

  return (
    <div className="Sqr">
      <div className="Sqr__circle" ref={circleRef}>
        <div className="Sqr__ring" />

        {periods.map((period, index) => {
          const pos = dotPositions[index];
          const active = isActive(index);
          const hovered = isHovered(index);
          const showNumber = active || hovered;

          return (
            <div
              key={period.id}
              ref={(el) => {
                dotRefs.current[index] = el;
              }}
              className={`Sqr__dot-wrapper ${active ? "is-active" : ""} ${hovered ? "is-hovered" : ""}`}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
            >
              <button
                className="Sqr__dot"
                onClick={() => onSelect(index)}
                onMouseEnter={() => onHover(index)}
                onMouseLeave={() => onHover(null)}
                aria-label={`Период ${index + 1}: ${period.category}`}
              >
                <span
                  className={`Sqr__dot-inner ${showNumber ? "is-visible" : ""}`}
                >
                  {index + 1}
                </span>
              </button>

              <span className={`Sqr__label ${active ? "is-visible" : ""}`}>
                {period.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sqr;
