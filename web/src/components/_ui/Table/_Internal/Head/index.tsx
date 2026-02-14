import { twMerge } from "tailwind-merge";
import type { ITableHeadProps } from "../Types";

export function InternalTableHead({
  children,
  className,
  sortable,
  sortDirection,
  onSort,
  ...props
}: ITableHeadProps) {
  const isSortable = sortable ?? false;

  const handleClick = () => {
    if (isSortable && onSort) {
      onSort();
    }
  };

  return (
    <th
      className={twMerge(
        "px-4 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider",
        isSortable &&
          "cursor-pointer select-none hover:bg-neutral-light/10 transition-colors",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center gap-2">
        {children}
        {isSortable && (
          <div className="flex flex-col gap-0.5">
            <svg
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={twMerge(
                "transition-colors",
                sortDirection === "asc" ? "fill-gray-700" : "fill-gray-300",
              )}
            >
              <path d="M5 0L9.33013 5H0.669873L5 0Z" />
            </svg>
            <svg
              width="10"
              height="5"
              viewBox="0 0 10 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={twMerge(
                "transition-colors",
                sortDirection === "desc" ? "fill-gray-700" : "fill-gray-300",
              )}
            >
              <path d="M5 5L0.669873 0H9.33013L5 5Z" />
            </svg>
          </div>
        )}
      </div>
    </th>
  );
}
