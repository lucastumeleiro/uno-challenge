import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import type { IPaginationProps } from "./Types";

function Pagination({
  page,
  total,
  limit,
  onPageChange,
  disabled,
}: IPaginationProps) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  function getPages() {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++)
        pages.push(pageNumber);
      return pages;
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let pageNumber = start; pageNumber <= end; pageNumber++)
      pages.push(pageNumber);

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  }

  const buttonBase =
    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none";

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        type="button"
        className={twMerge(
          buttonBase,
          "text-neutral-dark hover:bg-neutral-light/50",
        )}
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 1}
      >
        <CaretLeftIcon size={16} weight="bold" />
      </button>

      {getPages().map((pageItem, index) =>
        pageItem === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="w-8 h-8 flex items-center justify-center text-sm text-neutral-medium"
          >
            ...
          </span>
        ) : (
          <button
            key={pageItem}
            type="button"
            className={twMerge(
              buttonBase,
              pageItem === page
                ? "bg-primary text-white"
                : "text-neutral-dark hover:bg-neutral-light/50",
            )}
            onClick={() => onPageChange(pageItem)}
            disabled={disabled || pageItem === page}
          >
            {pageItem}
          </button>
        ),
      )}

      <button
        type="button"
        className={twMerge(
          buttonBase,
          "text-neutral-dark hover:bg-neutral-light/50",
        )}
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= totalPages}
      >
        <CaretRightIcon size={16} weight="bold" />
      </button>
    </div>
  );
}

export { Pagination };
