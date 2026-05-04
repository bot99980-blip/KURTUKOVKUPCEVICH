import React from "react";

interface PagerProps {
  currentIndex: number;
  totalCount: number;
  category: string;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

const Pager: React.FC<PagerProps> = ({
  currentIndex,
  totalCount,
  category,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}) => {
  const formatNumber = (num: number) => String(num + 1).padStart(2, "0");
  const formatTotal = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="pager">
      <div className="pager__counter">
        <span className="pager__current">{formatNumber(currentIndex)}</span>
        <span className="pager__separator">/</span>
        <span className="pager__total">{formatTotal(totalCount)}</span>
      </div>

      <div className="pager__buttons">
        <button
          className={`pager__btn ${!canGoPrev ? "is-disabled" : ""}`}
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Предыдущий период"
        >
          <svg
            width="24"
            height="24"
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
          className={`pager__btn ${!canGoNext ? "is-disabled" : ""}`}
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Следующий период"
        >
          <svg
            width="24"
            height="24"
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

      <div className="pager__category">
        <span className="pager__category-name">{category}</span>
        <div className="pager__category-line" />
      </div>
    </div>
  );
};

export default Pager;
