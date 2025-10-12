import React from 'react';
import { useTranslation } from 'react-i18next';

function PaginationButtons({
  maxPages,
  pageNumber,
  onPageChange,
}) {
  const { t } = useTranslation();

  const limit = 4;
  const leftLimit = Math.floor(limit / 2);
  const rightLimit = limit - leftLimit;

  let left = pageNumber - leftLimit;
  let right = pageNumber + rightLimit;

  if (maxPages < limit) {
    left = 1;
    right = maxPages;
  } else {
    if (left <= 0) {
      right += Math.abs(left);
      left = 1;
    } else if (right > maxPages) {
      left -= (right - maxPages);
      right = maxPages;
    }
  }

  const pages = [];
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4 gap-1 items-center">
      {/* Previous */}
      {pageNumber > 1 && (
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          title={t("pagination.previous")}
          className="text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
        >
          &lt;
        </button>
      )}

      {/* Page Numbers */}
      {pages.map((i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`text-xs px-3 py-1 mx-0.5 
            ${i === pageNumber
              ? 'text-orange-500 bg-white border border-orange-400 rounded'
              : 'text-black'
            }`}
        >
          {i}
        </button>
      ))}

      {/* Next */}
      {pageNumber < maxPages && (
        <button
          onClick={() => onPageChange(pageNumber + 1)}
          title={t("pagination.next")}
          className="text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default PaginationButtons;
