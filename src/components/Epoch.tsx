import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

interface EpochProps {
  startYear: number;
  endYear: number;
}

const Epoch: React.FC<EpochProps> = ({ startYear, endYear }) => {
  const startYearRef = useRef<HTMLSpanElement>(null);
  const endYearRef = useRef<HTMLSpanElement>(null);
  const [displayStart, setDisplayStart] = useState(startYear);
  const [displayEnd, setDisplayEnd] = useState(endYear);
  const animFrameRef = useRef<number | null>(null);

  const animateNumber = useCallback(
    (
      from: number,
      to: number,
      setter: (val: number) => void,
      duration: number = 800,
    ) => {
      const startTime = performance.now();

      const tick = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * eased);
        setter(current);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    },
    [],
  );

  useEffect(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    animateNumber(displayStart, startYear, setDisplayStart);
    animateNumber(displayEnd, endYear, setDisplayEnd);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [startYear, endYear]);

  useEffect(() => {
    if (startYearRef.current) {
      gsap.fromTo(
        startYearRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 1 },
      );
    }
    if (endYearRef.current) {
      gsap.fromTo(
        endYearRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 1 },
      );
    }
  }, [startYear, endYear]);

  return (
    <div className="epoch">
      <span ref={startYearRef} className="epoch__year epoch__year--start">
        {displayStart}
      </span>
      <span ref={endYearRef} className="epoch__year epoch__year--end">
        {displayEnd}
      </span>
    </div>
  );
};

export default Epoch;
